import React from "react";
import Navbar from "./components/Navbar";
import WorldMap from "./components/WorldMap";
import RegionDashboard from "./components/RegionDashboard";
import ResourceChart from "./components/ResourceChart";
import JobQueue from "./components/JobQueue";
import AlertFeed from "./components/AlertFeed";
import LoginModal from "./components/LoginModal";
import AdminPanel from "./components/AdminPanel";
import useStore from "./state/store";

export default function App() {
  const theme = useStore((s) => s.theme);

  return (
    <div className={theme === "dark" ? "bg-gray-950 text-white min-h-screen" : "bg-white text-gray-900 min-h-screen"}>
      <Navbar />
      <main className="max-w-5xl mx-auto px-2 py-6 grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-300">
        <section className="col-span-1">
          <WorldMap />
          <RegionDashboard />
        </section>
        <section className="col-span-1">
          <ResourceChart />
          <JobQueue />
          <AlertFeed />
        </section>
      </main>
      <LoginModal />
      <AdminPanel />
    </div>
  );
}
