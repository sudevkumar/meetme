import { getEventAvailability, getUserEventDetails } from "@/actions/events";
import BookingForm from "@/components/component/BookingForm";
import EventDetails from "@/components/component/EventDetails";
import { Suspense } from "react";
import { BarLoader } from "react-spinners";

export async function generateMetadata({ params }) {
  const event = await getUserEventDetails(params.username, params.eventId);
  if (!event) {
    return {
      title: "Event not found",
    };
  }

  return {
    title: `Book ${
      ["a", "e", "i", "o", "u"].includes(event.title[0].toLowerCase())
        ? "an"
        : "a"
    } ${event.title} with ${event.user.name} | ChronoHub!`,
    description: `Schedule a ${event.duration} - minute ${event.title} event with ${event.user.name}`,
  };
}

const GetUserEvents = async ({ params }) => {
  const event = await getUserEventDetails(params.username, params.eventId);
  const availibility = await getEventAvailability(params.eventId);

  if (!event) {
    notFound();
  }
  return (
    <div className=" flex flex-col justify-center lg:flex-row px-4 py-8">
      <EventDetails event={event} />
      <Suspense
        fallback={
          <div>
            <BarLoader width="100%" color="#36d7b7" />
          </div>
        }
      >
        <BookingForm event={event} availibility={availibility} />
      </Suspense>
    </div>
  );
};

export default GetUserEvents;
