import { createFileRoute } from "@tanstack/react-router";
import { WallCalendar } from "@/components/calendar/WallCalendar";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8 sm:py-12">
      <WallCalendar />
    </div>
  );
}
