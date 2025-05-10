import useStore from "../state/store";
import useRealtimeJobs from "../hooks/useRealtimeJobs";

const statusColors = {
  Running: "bg-green-700 text-white",
  Queued: "bg-yellow-600 text-black",
  Completed: "bg-gray-600 text-white"
};

import React from "react";
export default function JobQueue() {
  const selectedRegion = useStore((s) => s.selectedRegion);
  const jobs = useRealtimeJobs();
  return (
    <div style={{ border: '1px solid #888', padding: 12, margin: 8 }}>
      <h3>Training Job Queue ({selectedRegion})</h3>
      {jobs.length === 0 && <div>No jobs found.</div>}
      <table style={{ width: '100%', fontSize: 14 }}>
        <thead>
          <tr>
            <th>Job Name</th>
            <th>Status</th>
            <th>Started</th>
            <th>Ended</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job, idx) => (
            <tr key={job.id || idx}>
              <td>{job.job_name}</td>
              <td>{job.status}</td>
              <td>{job.started_at ? new Date(job.started_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '-'}</td>
              <td>{job.ended_at ? new Date(job.ended_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
