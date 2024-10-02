"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usernameSchema } from "@/app/lib/validators";
import useFetch from "@/hookos/use-fetch";
import { updateUserName } from "@/actions/users";
import { BarLoader } from "react-spinners";

const DashBoard = () => {
  const { isLoaded, user } = useUser();

  // useForm
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(usernameSchema),
  });

  // Form handle function

  const { loading, error, fc: fcUpdateUserName } = useFetch(updateUserName);

  const onSubmit = async (data) => {
    fcUpdateUserName(data.username);
  };

  // Set Default value to the input field

  useEffect(() => {
    setValue("username", user?.username);
  }, [isLoaded]);

  return (
    <div className=" space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Welcome, {user?.firstName}</CardTitle>
        </CardHeader>

        {/* Upcoming Calls */}
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Unique Link</CardTitle>
        </CardHeader>

        <CardContent>
          <form
            action=""
            className=" space-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <div className=" flex items-center gap-2">
                <span>{window.location.origin}/</span>
                <Input {...register("username")} placeholder="Ex: John_Doe" />
              </div>

              {/* Error for hook form i.e to validate the username */}
              {errors.username && (
                <p className=" text-red-500 text-sm mt-1">
                  {" "}
                  {errors.username.message}
                </p>
              )}

              {/* Error for the API  */}
              {errors.username && (
                <p className=" text-red-500 text-sm mt-1">
                  {" "}
                  {errors.username.message}
                </p>
              )}
            </div>
            {loading && (
              <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
            )}
            <Button type="Submit">Update Link</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashBoard;
