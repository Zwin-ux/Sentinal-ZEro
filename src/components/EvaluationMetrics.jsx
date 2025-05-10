import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function EvaluationMetrics() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let interval = setInterval(() => {
      fetchResults();
    }, 3000); // Poll every 3 seconds
    fetchResults();
    return () => clearInterval(interval);
  }, []);

  async function fetchResults() {
    setLoading(true);
    const { data, error } = await supabase
      .from('evaluation_results')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(20);
    if (!error) setResults(data || []);
    setLoading(false);
  }

  if (loading) return <div>Loading evaluation metrics...</div>;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 my-4">
      <h2 className="text-xl font-bold mb-2">Chatbot Evaluation Results (Live)</h2>
      <table className="min-w-full text-xs">
        <thead>
          <tr>
            <th>Prompt</th>
            <th>Response</th>
            <th>Metric</th>
            <th>Score</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {results.map(res => (
            <tr key={res.id}>
              <td className="max-w-xs truncate" title={res.prompt}>{res.prompt}</td>
              <td className="max-w-xs truncate" title={res.response}>{res.response}</td>
              <td>{res.metric}</td>
              <td>{res.score?.toFixed(2)}</td>
              <td>{new Date(res.timestamp * 1000).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
