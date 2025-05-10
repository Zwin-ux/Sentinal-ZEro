import { useState } from "react";
import { supabase } from "../supabaseClient";
import useStore from "../state/store";

export default function AdminPanel() {
  const user = useStore((s) => s.user);
  if (!user || user.role !== "Ops Engineer") return null;

  // Demo state for forms
  const [job, setJob] = useState({ job_name: "", status: "Queued" });
  const [alert, setAlert] = useState({ message: "", severity: "INFO" });
  const [metric, setMetric] = useState({ cpu_usage: 0, gpu_usage: 0, ram_usage: 0, power_draw: 0 });
  const [regionId, setRegionId] = useState("");
  const [msg, setMsg] = useState("");

  async function handleAddJob(e) {
    e.preventDefault();
    await supabase.from('jobs').insert([{ ...job, region_id: regionId, started_at: new Date().toISOString() }]);
    setMsg("Job injected!");
  }
  async function handleAddAlert(e) {
    e.preventDefault();
    await supabase.from('alerts').insert([{ ...alert, region_id: regionId, created_at: new Date().toISOString(), acknowledged: false }]);
    setMsg("Alert injected!");
  }
  async function handleAddMetric(e) {
    e.preventDefault();
    await supabase.from('system_metrics').insert([{ ...metric, region_id: regionId, timestamp: new Date().toISOString() }]);
    setMsg("Metric injected!");
  }

  return (
    <div className="fixed bottom-4 right-4 bg-gray-900 p-4 rounded shadow-lg w-[340px] z-40">
      <h2 className="text-lg font-bold mb-2 text-blue-400">Admin Panel</h2>
      <form className="mb-2" onSubmit={handleAddJob}>
        <div className="font-semibold mb-1">Inject Job</div>
        <input className="w-full mb-1 px-2 py-1 rounded bg-gray-800 text-white" placeholder="Job Name" value={job.job_name} onChange={e => setJob({ ...job, job_name: e.target.value })} />
        <select className="w-full mb-1 px-2 py-1 rounded bg-gray-800 text-white" value={job.status} onChange={e => setJob({ ...job, status: e.target.value })}>
          <option>Queued</option><option>Running</option><option>Completed</option>
        </select>
        <input className="w-full mb-1 px-2 py-1 rounded bg-gray-800 text-white" placeholder="Region ID" value={regionId} onChange={e => setRegionId(e.target.value)} />
        <button className="bg-blue-700 hover:bg-blue-500 text-white py-1 px-3 rounded" type="submit">Add Job</button>
      </form>
      <form className="mb-2" onSubmit={handleAddAlert}>
        <div className="font-semibold mb-1">Inject Alert</div>
        <input className="w-full mb-1 px-2 py-1 rounded bg-gray-800 text-white" placeholder="Message" value={alert.message} onChange={e => setAlert({ ...alert, message: e.target.value })} />
        <select className="w-full mb-1 px-2 py-1 rounded bg-gray-800 text-white" value={alert.severity} onChange={e => setAlert({ ...alert, severity: e.target.value })}>
          <option>INFO</option><option>WARN</option><option>CRITICAL</option>
        </select>
        <input className="w-full mb-1 px-2 py-1 rounded bg-gray-800 text-white" placeholder="Region ID" value={regionId} onChange={e => setRegionId(e.target.value)} />
        <button className="bg-blue-700 hover:bg-blue-500 text-white py-1 px-3 rounded" type="submit">Add Alert</button>
      </form>
      <form className="mb-2" onSubmit={handleAddMetric}>
        <div className="font-semibold mb-1">Inject Metric</div>
        <input className="w-full mb-1 px-2 py-1 rounded bg-gray-800 text-white" placeholder="CPU Usage" type="number" value={metric.cpu_usage} onChange={e => setMetric({ ...metric, cpu_usage: Number(e.target.value) })} />
        <input className="w-full mb-1 px-2 py-1 rounded bg-gray-800 text-white" placeholder="GPU Usage" type="number" value={metric.gpu_usage} onChange={e => setMetric({ ...metric, gpu_usage: Number(e.target.value) })} />
        <input className="w-full mb-1 px-2 py-1 rounded bg-gray-800 text-white" placeholder="RAM Usage" type="number" value={metric.ram_usage} onChange={e => setMetric({ ...metric, ram_usage: Number(e.target.value) })} />
        <input className="w-full mb-1 px-2 py-1 rounded bg-gray-800 text-white" placeholder="Power Draw" type="number" value={metric.power_draw} onChange={e => setMetric({ ...metric, power_draw: Number(e.target.value) })} />
        <input className="w-full mb-1 px-2 py-1 rounded bg-gray-800 text-white" placeholder="Region ID" value={regionId} onChange={e => setRegionId(e.target.value)} />
        <button className="bg-blue-700 hover:bg-blue-500 text-white py-1 px-3 rounded" type="submit">Add Metric</button>
      </form>
      {msg && <div className="text-green-400 text-sm mt-2">{msg}</div>}
    </div>
  );
}
