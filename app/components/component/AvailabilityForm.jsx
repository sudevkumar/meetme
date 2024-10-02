"use client";
import { availabilityFormSchema } from "@/app/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { timeSlots } from "@/app/(private)/availability/data";

const AvailabilityForm = ({ initialData }) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(availabilityFormSchema),
    defaultValues: { ...initialData },
  });
  return (
    <form>
      {[
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ].map((d) => {
        const isAvailable = watch(`${d}.isAvailable`);

        return (
          <div className=" flex items-center space-x-4 mb-4" key={d}>
            <Controller
              name={`${d}.isAvailable`}
              control={control}
              render={({ field }) => {
                return (
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      setValue(`${d}.isAvailable`, checked);
                      if (!checked) {
                        setValue(`${d}.startTime`, "09:00");
                        setValue(`${d}.endTime`, "17:00");
                      }
                    }}
                  />
                );
              }}
            />

            <span className=" capitalize w-24">{d}</span>
            {isAvailable && (
              <>
                <Controller
                  name={`${d}.startTime`}
                  control={control}
                  render={({ field }) => {
                    return (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Start time" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((t) => {
                            return (
                              <SelectItem value={t} key={t}>
                                {t}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    );
                  }}
                />

                {/*  */}
                <span>to</span>
                <Controller
                  name={`${d}.endTime`}
                  control={control}
                  render={({ field }) => {
                    return (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="End time" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((t) => {
                            return (
                              <SelectItem value={t} key={t}>
                                {t}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    );
                  }}
                />

                {errors[d]?.endTime && (
                  <span className=" text-red-500 text-sm ml-2">
                    {errors[d]?.endTime.message}
                  </span>
                )}
              </>
            )}
          </div>
        );
      })}
    </form>
  );
};

export default AvailabilityForm;
