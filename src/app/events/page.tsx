import EventList from "@/components/EventList";

export default function Events() {
  return (
    <div className="min-h-screen p-6 flex flex-col gap-8">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">Upcoming Events</h1>
      <EventList />
    </div>
  );
}
