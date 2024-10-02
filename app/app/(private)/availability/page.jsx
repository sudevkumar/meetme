import { getUserAvailability } from "@/actions/availibity";
import React from "react";
import { defaultAvailability } from "./data";
import AvailabilityForm from "@/components/component/AvailabilityForm";

const AvailabityPage = async () => {
  const availability = await getUserAvailability();
  console.log(availability);

  return <AvailabilityForm initialData={availability || defaultAvailability} />;
};

export default AvailabityPage;
