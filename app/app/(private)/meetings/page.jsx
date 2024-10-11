import { getUserMeetings } from "@/actions/meeting";
import MeetingList from "@/components/component/MeetingList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Suspense } from "react";
import { BarLoader } from "react-spinners";

export const metadata = {
  title: "Your Meetings | ChronoHub",
  description: "View and manage your upcoming and past meetings.",
};

const MeetingPage = () => {
  return (
    <Tabs defaultValue="upcoming">
      <TabsList className="mb-4">
        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        <TabsTrigger value="past">Past</TabsTrigger>
      </TabsList>
      <TabsContent value="upcoming">
        <Suspense
          fallback={
            <div>
              <BarLoader width="100%" color="#36d7b7" />
            </div>
          }
        >
          <UpcomingMeetings />
        </Suspense>
      </TabsContent>
      <TabsContent value="past">
        <Suspense
          fallback={
            <div>
              <BarLoader width="100%" color="#36d7b7" />
            </div>
          }
        >
          <PastMeetings />
        </Suspense>
      </TabsContent>
    </Tabs>
  );
};

async function UpcomingMeetings() {
  const meetings = await getUserMeetings("upcoming");
  return <MeetingList meetings={meetings} type="upcoming" />;
}

async function PastMeetings() {
  const meetings = await getUserMeetings("past");
  return <MeetingList meetings={meetings} type="past" />;
}

export default MeetingPage;
