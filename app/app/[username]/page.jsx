import { getUserByUsername } from "@/actions/users";
import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import EventsCard from "@/components/component/EventsCard";

export async function generateMetadata({ params }) {
  const user = await getUserByUsername(params.username);
  if (!user) {
    return {
      title: "User not found",
    };
  }

  return {
    title: `${user.name}'s profile | ChronoHub!`,
    description: `Book an event with ${user.name}. View available public events and schedule.`,
  };
}

const Userpage = async ({ params }) => {
  const user = await getUserByUsername(params.username);

  if (!user) {
    notFound();
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <div className=" flex flex-col items-center mb-8">
        <Avatar className=" w-24 h-24 mb-4">
          <AvatarImage src={user.imageUrl} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <h1 className=" text-3xl font-bold mb-2 capitalize">{user.name}</h1>
        <p className=" text-gray-600 text-center">
          Welcome to my scheduling page. Please select an event below to book a
          call with me
        </p>
      </div>

      {user.events.length === 0 ? (
        <p>There is no public events available</p>
      ) : (
        <div className=" grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
          {user.events.map((e) => {
            return (
              <EventsCard
                key={e.id}
                event={e}
                username={params.username}
                isPublic
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Userpage;
