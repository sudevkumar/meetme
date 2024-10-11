"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sudev Kumar",
      role: "Marketing Manager",
      content:
        "Honestly, can't believe this is free. it's like calendly but without making my wallet cry. Scheduling has never been so easy, and i didn’t even have to google a tutorial to figure it out. 10/10 recommend.",
      image:
        "https://images.unsplash.com/photo-1492447273231-0f8fecec1e3a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Gourav Sahoo",
      role: "Freelance Designer",
      content:
        "legit, i switched in like 5 mins. super clean UI and doesn’t limit my life choices with paywalls. my meetings are organized and my life is... still a mess, but at least i’m on time now. lol",
      image:
        "https://images.unsplash.com/photo-1506634572416-48cdfe530110?q=80&w=1885&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Sachin Nayak",
      role: "QA Engineer",
      content:
        "bruh, free features that actually work??? no annoying ads or upsells every 2 seconds. it’s like they actually care about the user experience or something. crazy, i know ",
      image:
        "https://images.unsplash.com/photo-1489980557514-251d61e3eeb6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Radhika Swain",
      role: "Sales Executive",
      content:
        "since using chronoHub, i’ve become a master of time (well, not really, but it’s helping). no more awkward double-bookings, and my clients can actually pick times that work. revolutionary concept, right?",
      image:
        "https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },

    {
      name: "Samikhya panda",
      role: "Sales Executive",
      content:
        "i feel like i discovered a hack. free forever and looks good doing it. get chronoHub now before they realize it’s too good to stay free!",
      image: "",
    },
  ];

  return (
    <div className=" mb-24">
      <h2 className=" text-3xl font-bold text-center mb-12 text-blue-600">
        What Our Users Say?
      </h2>

      <Carousel
        className="w-full mx-auto"
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
      >
        <CarouselContent className="">
          {testimonials.map((ele, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <Card className=" h-full">
                <CardContent className="flex flex-col   justify-between p-6 h-full">
                  <p className=" text-gray-600 mb-4">
                    &quot;{ele.content}&quot;
                  </p>

                  <div className=" flex items-center mt-4">
                    <Avatar className=" h-12 w-12 mr-4 ">
                      <AvatarImage src={ele.image} />
                      <AvatarFallback>
                        {ele.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <p className=" font-semibold ">{ele.name}</p>
                      <p className=" text-sm to-gray-500 ">{ele.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default Testimonials;
