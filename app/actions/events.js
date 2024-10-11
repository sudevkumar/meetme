"use server";

import { eventFormSchema } from "@/app/lib/validators";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import {
  addDays,
  addMinutes,
  format,
  isBefore,
  parseISO,
  startOfDay,
} from "date-fns";

// Create a event for user

export const createEvent = async (data) => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized!");
  }

  const validateData = eventFormSchema.parse(data);

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    return new Error("User is not found!");
  }

  const event = await db.event.create({
    data: {
      ...validateData,
      userId: user.id,
    },
  });

  return event;
};

// Get user event

export const getUserEvent = async (data) => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized!");
  }

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    return new Error("User is not found!");
  }

  const events = await db.event.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { bookings: true },
      },
    },
  });

  return { events, username: user.username };
};

// Get user event details
export const getUserEventDetails = async (username, eventId) => {
  const event = await db.event.findFirst({
    where: {
      id: eventId,
      user: {
        username: username,
      },
    },

    include: {
      user: {
        select: {
          name: true,
          email: true,
          imageUrl: true,
          username: true,
        },
      },
    },
  });

  return event;
};

// Get user's event availibility
export const getEventAvailability = async (eventId) => {
  const event = await db.event.findUnique({
    where: { id: eventId },
    include: {
      user: {
        include: {
          availability: {
            select: {
              days: true,
              timeGap: true,
            },
          },
          bookings: {
            select: {
              startTime: true,
              endTime: true,
            },
          },
        },
      },
    },
  });

  if (!event || !event.user.availability) {
    return [];
  }

  const { availability, bookings } = event.user;
  const startDate = startOfDay(new Date());
  const endDate = addDays(startDate, 30); // Get availability for the next 30 days

  const availableDates = [];

  for (let date = startDate; date <= endDate; date = addDays(date, 1)) {
    const dayOfWeek = format(date, "EEEE").toUpperCase();
    const dayAvailability = availability?.days?.find(
      (d) => d.day === dayOfWeek
    );

    if (dayAvailability) {
      const dateStr = format(date, "yyyy-MM-dd");

      const slots = generateAvailableTimeSlots(
        dayAvailability.startTime,
        dayAvailability.endTime,
        event.duration,
        bookings,
        dateStr,
        availability.timeGap
      );

      availableDates.push({
        date: dateStr,
        slots,
      });
    }
  }

  return availableDates;
};

const generateAvailableTimeSlots = (
  startTime,
  endTime,
  duration,
  bookings,
  dateStr,
  timeGap = 0
) => {
  const slots = [];
  let currentTime = parseISO(
    `${dateStr}T${startTime.toISOString().slice(11, 16)}`
  );
  const slotEndTime = parseISO(
    `${dateStr}T${endTime.toISOString().slice(11, 16)}`
  );

  // If the date is today, start from the next available slot after the current time
  const now = new Date();
  if (format(now, "yyyy-MM-dd") === dateStr) {
    currentTime = isBefore(currentTime, now)
      ? addMinutes(now, timeGap)
      : currentTime;
  }

  while (currentTime < slotEndTime) {
    const slotEnd = new Date(currentTime.getTime() + duration * 60000);

    const isSlotAvailable = !bookings.some((booking) => {
      const bookingStart = booking.startTime;
      const bookingEnd = booking.endTime;
      return (
        (currentTime >= bookingStart && currentTime < bookingEnd) ||
        (slotEnd > bookingStart && slotEnd <= bookingEnd) ||
        (currentTime <= bookingStart && slotEnd >= bookingEnd)
      );
    });

    if (isSlotAvailable) {
      slots.push(format(currentTime, "HH:mm"));
    }

    currentTime = slotEnd;
  }

  return slots;
};

// delete user event

export const deleteUserEvent = async (eventId) => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized!");
  }

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    return new Error("User is not found!");
  }

  const event = await db.event.findUnique({
    where: { id: eventId },
  });

  if (!event || event.userId !== user.id) {
    throw new Error("Event not found or unauthorized!");
  }

  // if () {
  //   throw new Error("You are unauthorized to this perticular event!");
  // }

  await db.event.delete({
    where: { id: eventId },
  });

  return { success: true };
};
