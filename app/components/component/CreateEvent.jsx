"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import EventForm from "./EventForm";

const CreateEvent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClose = () => {
    setIsOpen(false);
    if (searchParams.get("create") === "true") {
      router.replace(window.location?.pathname);
    }
  };

  //   Open Create Event
  useEffect(() => {
    const create = searchParams.get("create");
    if (create === "true") {
      setIsOpen(true);
    }
  }, [searchParams]);
  return (
    <Drawer open={isOpen}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Create A New Event</DrawerTitle>
        </DrawerHeader>
        <EventForm
          onSubmitForm={() => {
            handleClose();
          }}
        />
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateEvent;
