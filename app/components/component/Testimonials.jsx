"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sudev Kumar",
      role: "Marketing Manager",
      content:
        "ChronoHub has transformed how I manage my team's meetings. It's intuitive and saves us hours every week!",
      image: "https://i.pravatar.cc/150?img=1",
    },
    {
      name: "Gourav Sahoo",
      role: "Freelance Designer",
      content:
        "As a freelancer, ChronoHub helps me stay organized and professional. My clients love how easy it is to book time with me.",
      image: "https://i.pravatar.cc/150?img=2",
    },
    {
      name: "Sachin Nayak",
      role: "Startup Founder",
      content:
        "ChronoHub streamlined our hiring process. Setting up interviews has never been easier!",
      image: "https://i.pravatar.cc/150?img=3",
    },
    {
      name: "Radhika Swain",
      role: "Sales Executive",
      content:
        "I've seen a 30% increase in my meeting bookings since using ChronoHub. It's a game-changer for sales professionals.",
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
