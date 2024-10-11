"use client";

import { bookingSchema } from "@/app/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import useFetch from "@/hookos/use-fetch";
import { createBooking } from "@/actions/bookings";

const BookingForm = ({ event, availibility }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const { loading, data, fc: fnCreateBooking } = useFetch(createBooking);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bookingSchema),
  });

  const availableDays = availibility.map((day) => new Date(day.date));

  const timeSlots = selectedDate
    ? availibility.find(
        (day) => day.date === format(selectedDate, "yyyy-MM-dd")
      )?.slots || []
    : [];

  useEffect(() => {
    if (selectedDate) {
      setValue("date", format(selectedDate, "yyyy-MM-dd"));
    }
  }, [selectedDate]);

  useEffect(() => {
    if (selectedTime) {
      setValue("time", selectedTime);
    }
  }, [selectedTime]);

  const onSubmit = async (data) => {
    console.log(data);

    if (!selectedTime && !selectedDate) {
      console.error("Date or time is not selected!");
      return;
    }

    const startTime = new Date(
      `${format(selectedDate, "yyyy-MM-dd")}T${selectedTime}`
    );

    const endTime = new Date(startTime.getTime() + event.duration * 60000);

    const bookingData = {
      eventId: event.id,
      name: data.name,
      email: data.email,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      additionalInfo: data.additionalInfo,
    };

    await fnCreateBooking(bookingData);
  };

  console.log(data?.meetLink, "sudevvv");

  if (data) {
    return (
      <div className="text-center p-10 border bg-white">
        <h2 className="text-2xl font-bold mb-4">Booking successful!</h2>
        {data.meetLink && (
          <p>
            Join the meeting:{" "}
            <a
              href={data.meetLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {data.meetLink}
            </a>
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 p-10 border bg-white">
      <div className=" md:h-96 flex flex-col md:flex-row gap-5">
        <div className="w-full">
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={(date) => {
              setSelectedDate(date);
              setSelectedTime(null);
            }}
            disabled={[{ before: new Date() }]}
            modifiers={{
              available: availableDays,
            }}
            modifiersStyles={{
              available: {
                background: "lightblue",
                borderRadius: 100,
              },
            }}
          />
        </div>

        {/* time slot */}
        <div className="w-full h-full md:overflow-scroll no-scrollbar">
          {selectedDate && (
            <div className=" mb-4">
              <h3 className="text-lg font-semibold mb-2">
                Available time slots
              </h3>
              {timeSlots.length === 0 ? (
                <div>
                  <p className="text-sm text-red-500 font-semibold">
                    Please choose a correct date.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                  {timeSlots.map((ele) => {
                    return (
                      <Button
                        key={ele}
                        onClick={() => setSelectedTime(ele)}
                        variant={selectedTime === ele ? "default" : "outline"}
                      >
                        {ele}
                      </Button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* form */}
      {selectedTime && (
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input {...register("name")} placeholder="Your name" />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Input
              {...register("email")}
              placeholder="Your email"
              type="email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Textarea
              {...register("additionalInfo")}
              placeholder="Any messages"
            />
            {errors.additionalInfo && (
              <p className="text-red-500 text-sm">
                {errors.additionalInfo.message}
              </p>
            )}
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Scheduling..." : "Schedule Event"}
          </Button>
        </form>
      )}
    </div>
  );
};

export default BookingForm;
