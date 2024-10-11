import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const HeroBanner = () => {
  return (
    <div className=" flex flex-col lg:flex-row items-center justify-center gap-12 mb-24">
      {/* Heading and desc */}
      <div className=" lg:w-1/2">
        <h1 className=" text-7xl font-extrabold pb-6 gradient-title">
          Simplify your Meetings
        </h1>

        <p className=" text-xl text-gray-600 mb-10">
          ChronoHub help you to manage your time effectively. Create events, set
          your availability, and let others book time with you seamlessly.
        </p>

        {/* Button */}
        <Link href={"/dashboard"}>
          <Button size="lg" className="text-lg">
            Get Started
            <ArrowRight className=" h-5 w-5 ml-2" />
          </Button>
        </Link>
      </div>

      {/* Poster */}
      <div className=" w-1/2 flex justify-center">
        <div className=" relative w-full max-w-md aspect-square">
          <Image
            src="/poster.png"
            alt="Poster"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
