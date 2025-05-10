import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import useStore from '../state/store';

export default function useRealtimeAlerts() {
  const selectedRegion = useStore((s) => s.selectedRegion);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    if (!selectedRegion) return;
    let subscription;
    supabase
      .from('alerts')
      .select('*')
      .eq('region_id', selectedRegion)
      .order('created_at', { ascending: false })
      .then(({ data }) => setAlerts(data || []));

    subscription = supabase
      .channel('public:alerts')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'alerts', filter: `region_id=eq.${selectedRegion}` }, (payload) => {
        setAlerts((prev) => {
          const idx = prev.findIndex(a => a.id === payload.new.id);
          if (idx > -1) {
            const copy = [...prev];
            copy[idx] = payload.new;
            return copy;
          }
          return [payload.new, ...prev];
        });
      })
      .subscribe();

    return () => {
      if (subscription) supabase.removeChannel(subscription);
    };
  }, [selectedRegion]);

  return alerts;
}
