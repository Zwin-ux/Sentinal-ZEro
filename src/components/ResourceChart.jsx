import React from "react";
import useStore from "../state/store";
import useRealtimeMetrics from "../hooks/useRealtimeMetrics";

export default function ResourceChart() {
  const selectedRegion = useStore((s) => s.selectedRegion);
  const metrics = useRealtimeMetrics();
  return (
    <div style={{ border: '1px solid #888', padding: 12, margin: 8 }}>
      <h3>Live Resource Monitor ({selectedRegion})</h3>
      {metrics.length === 0 && <div>No metrics found.</div>}
      <pre style={{ fontSize: 12, background: '#f4f4f4', padding: 8, overflowX: 'auto' }}>{JSON.stringify(metrics, null, 2)}</pre>
    </div>
  );
}
