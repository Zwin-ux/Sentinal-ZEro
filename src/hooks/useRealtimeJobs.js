import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import useStore from '../state/store';

export default function useRealtimeJobs() {
  const selectedRegion = useStore((s) => s.selectedRegion);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    if (!selectedRegion) return;
    let subscription;
    supabase
      .from('jobs')
      .select('*')
      .eq('region_id', selectedRegion)
      .order('started_at', { ascending: false })
      .then(({ data }) => setJobs(data || []));

    subscription = supabase
      .channel('public:jobs')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'jobs', filter: `region_id=eq.${selectedRegion}` }, (payload) => {
        setJobs((prev) => {
          const idx = prev.findIndex(j => j.id === payload.new.id);
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

  return jobs;
}
