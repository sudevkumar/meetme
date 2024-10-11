import { getUserEvent } from "@/actions/events";
import EventsCard from "@/components/component/EventsCard";
import { Suspense } from "react";
import { BarLoader } from "react-spinners";

export default function EventdPage() {
  return (
    <Suspense
      fallback={
        <div>
          <BarLoader width="100%" color="#36d7b7" />
        </div>
      }
    >
      <EventPage />
    </Suspense>
  );
}

const EventPage = async () => {
  const { events, username } = await getUserEvent();

  if (events.length === 0) {
    return <p>You have not created any events yet!</p>;
  }
  return (
    <div className=" grid gap-4 grid-cols-1 lg:grid-cols-2">
      {events.map((ele) => (
        <EventsCard key={ele.id} event={ele} username={username} />
      ))}
    </div>
  );
};
