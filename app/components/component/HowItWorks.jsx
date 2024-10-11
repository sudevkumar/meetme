import React from "react";

const HowItWorks = () => {
  const howItWorks = [
    { step: "Sign Up", description: "Create your free ChronoHub account" },
    {
      step: "Set Availability",
      description: "Define when you're available for meetings",
    },
    {
      step: "Share Your Link",
      description: "Send your scheduling link to clients or colleagues",
    },
    {
      step: "Get Booked",
      description: "Receive confirmations for new appointments automatically",
    },
  ];
  return (
    <div className=" mb-24">
      <h2 className=" text-3xl font-bold text-center mb-12 text-blue-600">
        How It Works?
      </h2>

      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 h-full">
        {howItWorks.map((ele, ind) => (
          <div
            key={ind}
            className=" text-center border p-3 rounded-md shadow-md border-blue-400"
          >
            <div className=" bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className=" text-blue-600 font-bold text-xl">
                {ind + 1}
              </span>
            </div>

            <h3 className=" font-semibold text-lg mb-2">{ele.step}</h3>
            <p className=" text-gray-600">{ele.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
