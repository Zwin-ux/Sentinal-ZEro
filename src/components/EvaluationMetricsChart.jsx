import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

export default function EvaluationMetricsChart() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [average, setAverage] = useState(null);

  useEffect(() => {
    let interval = setInterval(() => {
      fetchResults();
    }, 3000);
    fetchResults();
    return () => clearInterval(interval);
  }, []);

  async function fetchResults() {
    setLoading(true);
    const { data, error } = await supabase
      .from('evaluation_results')
      .select('*')
      .order('timestamp', { ascending: true })
      .limit(50);
    if (!error && data) {
      setResults(data);
      const avg = data.length
        ? data.reduce((sum, r) => sum + (r.score || 0), 0) / data.length
        : null;
      setAverage(avg);
    }
    setLoading(false);
  }

  if (loading) return <div>Loading evaluation chart...</div>;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 my-4">
      <h2 className="text-xl font-bold mb-2">Evaluation Score Trend</h2>
      {average !== null && (
        <div className="mb-2 text-sm">Average Score: <span className="font-semibold">{average.toFixed(2)}</span></div>
      )}
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={results} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" tickFormatter={ts => new Date(ts * 1000).toLocaleTimeString()} />
          <YAxis domain={[0, 1]} />
          <Tooltip labelFormatter={ts => new Date(ts * 1000).toLocaleString()} />
          <Line type="monotone" dataKey="score" stroke="#6366f1" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
