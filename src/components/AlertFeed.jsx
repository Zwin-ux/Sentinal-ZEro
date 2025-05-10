import useStore from "../state/store";
import useRealtimeAlerts from "../hooks/useRealtimeAlerts";
import { supabase } from "../supabaseClient";

import React from "react";
export default function AlertFeed() {
  const selectedRegion = useStore((s) => s.selectedRegion);
  const user = useStore((s) => s.user);
  const alerts = useRealtimeAlerts();
  const isOps = user?.role === "Ops Engineer";

  const acknowledgeAlert = async (id) => {
    await supabase.from('alerts').update({ acknowledged: true }).eq('id', id);
  };

  return (
    <div style={{ border: '1px solid #888', padding: 12, margin: 8 }}>
      <h3>Security & Anomaly Alerts ({selectedRegion})</h3>
      {alerts.length === 0 && <div>No alerts found.</div>}
      <ul>
        {alerts.map((alert, idx) => (
          <li key={alert.id || idx} style={{ marginBottom: 8, padding: 8, border: '1px solid #ccc' }}>
            <div>
              <b>{alert.message}</b> <span>({alert.severity})</span>
              <span style={{ marginLeft: 8 }}>{new Date(alert.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <div>
              {alert.acknowledged && <span style={{ color: 'green' }}>ACK</span>}
              {!alert.acknowledged && isOps && (
                <button style={{ marginLeft: 8 }} onClick={() => acknowledgeAlert(alert.id)}>Acknowledge</button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
