"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { Link, Trash } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useFetch from "@/hookos/use-fetch";
import { deleteUserEvent } from "@/actions/events";

const EventsCard = ({ event, username, isPublic = false }) => {
  const [isCopied, setCopied] = useState(false);
  const router = useRouter();

  //   Handle copy link

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/${username}?${event.id}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.log(error);
    }
  };

  //   Handle delete event

  const { loading, fc: fcDeleteUserEvent } = useFetch(deleteUserEvent);

  const handleDeleteEvent = async () => {
    if (window?.confirm("Are you sure you want to delete this event?")) {
      try {
        await fcDeleteUserEvent(event.id);
        router.refresh();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Card className=" flex flex-col justify-between cursor-pointer ">
      <CardHeader>
        <CardTitle classname=" text-2xl">{event?.title}</CardTitle>
        <CardDescription className=" w-full flex justify-between">
          <span>
            {event.duration} mins | {event.isPrivate ? "Private" : "Public"}
          </span>

          <span>{event?._count?.bookings} Bookings</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          {event.description.length > 70
            ? event.description.substring(0, 70) + "...."
            : event.description.substring(0, 70)}{" "}
        </p>
      </CardContent>
      {!isPublic && (
        <CardFooter className=" flex gap-2">
          <Button variant="outline" onClick={handleCopy}>
            <Link className=" mr-2 h-4 w-4" />{" "}
            {isCopied ? "Copied!" : "Copy Link"}
          </Button>

          <Button
            variant="destructive"
            onClick={handleDeleteEvent}
            disabled={loading}
          >
            <Trash className=" mr-2 h-4 w-4" />{" "}
            {loading ? "Deleteing" : "Delete"}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default EventsCard;
