import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import useStore from '../state/store';

export default function useRealtimeMetrics() {
  const selectedRegion = useStore((s) => s.selectedRegion);
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    if (!selectedRegion) return;
    let subscription;
    // Fetch initial metrics
    supabase
      .from('system_metrics')
      .select('*')
      .eq('region_id', selectedRegion)
      .order('timestamp', { ascending: true })
      .then(({ data }) => setMetrics(data || []));

    // Subscribe to new/changed metrics
    subscription = supabase
      .channel('public:system_metrics')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'system_metrics', filter: `region_id=eq.${selectedRegion}` }, (payload) => {
        setMetrics((prev) => {
          // Merge new/updated metric
          const idx = prev.findIndex(m => m.id === payload.new.id);
          if (idx > -1) {
            const copy = [...prev];
            copy[idx] = payload.new;
            return copy;
          }
          return [...prev, payload.new].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        });
      })
      .subscribe();

    return () => {
      if (subscription) supabase.removeChannel(subscription);
    };
  }, [selectedRegion]);

  return metrics;
}
