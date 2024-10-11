import HeroBanner from "@/components/component/HeroBanner";
import HowItWorks from "@/components/component/HowItWorks";
import KeyFeatures from "@/components/component/KeyFeatures";
import Testimonials from "@/components/component/Testimonials";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className=" container mx-auto px-4 py-16">
      {/* Hero Banner */}
      <HeroBanner />
      {/* Key Features */}
      <KeyFeatures />
      {/* Testimonials */}
      <Testimonials />
      {/* How it works */}
      <HowItWorks />
      {/* Ready */}
      <div className=" bg-blue-600 text-white rounded-lg p-8 text-center">
        <h2 className=" text-3xl font-bold mb-4">
          Ready To Simplify Your Scheduling?
        </h2>
        <p className="text-xl mb-6">
          Join Thousand Of Professionals Who Trust ChronoHub For Efficient Time
          Management.
        </p>
        <Link href={"/dashboard"}>
          <Button size="lg" variant="secondary" className=" text-blue-600">
            Start For Free <ArrowRight className=" w-5 h-5 ml-2" />
          </Button>
        </Link>
      </div>
    </main>
  );
}
