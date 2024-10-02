"use client";

import { eventFormSchema } from "@/app/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import useFetch from "@/hookos/use-fetch";
import { useRouter } from "next/navigation";
import { createEvent } from "@/actions/events";

const EventForm = ({ onSubmitForm }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      duration: 30,
      isPrivate: true,
    },
  });

  const { laoding, error, fc: createAnEvent } = useFetch(createEvent);

  const onSubmit = async (data) => {
    await createAnEvent(data);
    if (!laoding && !error) {
      onSubmitForm();
    }
    router.refresh();
  };

  return (
    <form
      className=" px-5 flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Event title */}
      <div>
        <label
          htmlFor="title"
          className=" block text-sm font-medium to-gray-700"
        >
          Event Title
        </label>
        <Input id="title" {...register("title")} className="mt-1" />
        {errors.title && (
          <p className=" text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>
      {/* Event Desc */}
      <div>
        <label
          htmlFor="description"
          className=" block text-sm font-medium to-gray-700"
        >
          Event Description
        </label>
        <Input id="description" {...register("description")} className="mt-1" />
        {errors.description && (
          <p className=" text-red-500 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>
      {/* Duration */}
      <div>
        <label
          htmlFor="duration"
          className=" block text-sm font-medium to-gray-700"
        >
          Event Duration (In Minute)
        </label>
        <Input
          id="duration"
          {...register("duration", {
            valueAsNumber: true,
          })}
          type="number"
          className="mt-1"
        />
        {errors.duration && (
          <p className=" text-red-500 text-sm mt-1">
            {errors.duration.message}
          </p>
        )}
      </div>
      {/* Is Private */}
      <div>
        <label
          htmlFor="duration"
          className=" block text-sm font-medium to-gray-700"
        >
          Event Type
        </label>

        <Controller
          name="isPrivate"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value ? "true" : "false"}
              onValueChange={(value) => field.onChange(value === "true")}
            >
              <SelectTrigger className=" mt-1">
                <SelectValue placeholder="Select Privacy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Private</SelectItem>
                <SelectItem value="false">Public</SelectItem>
              </SelectContent>
            </Select>
          )}
        />

        {errors.isPrivate && (
          <p className=" text-red-500 text-sm mt-1">
            {errors.isPrivate.message}
          </p>
        )}
      </div>
      {error && <p className=" text-red-500 text-xs mt-1">{error.message}</p>}
      <Button type="submit" disabled={laoding}>
        {laoding ? "Creating" : "Create An Event"}
      </Button>
    </form>
  );
};

export default EventForm;
