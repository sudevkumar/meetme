"use server";

import { eventFormSchema } from "@/app/lib/validators";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

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
