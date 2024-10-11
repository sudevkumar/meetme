"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import useFetch from "@/hookos/use-fetch";
import { cancelMeeting } from "@/actions/meeting";

const CancelMeet = ({ meetingId }) => {
  console.log(meetingId, "bnkb");
  const router = useRouter();

  const { loading, error, fc: fnCancelMeeting } = useFetch(cancelMeeting);

  const handleCancel = async () => {
    if (window.confirm("Are you sure you want to cancel this meeting?")) {
      await fnCancelMeeting(meetingId);
      router.refresh();
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <Button variant="destructive" onClick={handleCancel} disabled={loading}>
        {loading ? "Canceling..." : "Cancel Meeting"}
      </Button>
      {error && <span className="text-red-500 text-sm">{error.message}</span>}
    </div>
  );
};

export default CancelMeet;
