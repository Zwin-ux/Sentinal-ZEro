import ResourceChart from "./ResourceChart";
import JobQueue from "./JobQueue";
import AlertFeed from "./AlertFeed";

export default function RegionDashboard() {
  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="col-span-2">
        <ResourceChart />
        <JobQueue />
      </div>
      <AlertFeed />
    </section>
  );
}
