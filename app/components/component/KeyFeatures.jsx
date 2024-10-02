import { Calendar, Clock, LinkIcon } from "lucide-react";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

const KeyFeatures = () => {
  const features = [
    {
      icon: Calendar,
      title: "Create Events",
      description: "Easily set up and customize your event types",
    },
    {
      icon: Clock,
      title: "Manage Availability",
      description: "Define your availability to streamline scheduling",
    },
    {
      icon: LinkIcon,
      title: "Custom Links",
      description: "Share your personalized scheduling link",
    },
  ];

  return (
    <div className=" mb-24">
      <h2 className=" text-3xl font-bold text-center mb-12 text-blue-600">
        Key Features
      </h2>
      <div className=" grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((ele, ind) => (
          <Card key={ind}>
            <CardHeader>
              <ele.icon className=" w-12 h-12 text-blue-500 mb-4 mx-auto " />
              <CardTitle className="text-center text-blue-600">
                {" "}
                {ele.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className=" text-center text-gray-600">{ele.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default KeyFeatures;
