import React, { useState } from 'react';

export default function ChatbotDemo() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Set your deployed Lambda endpoint here or via .env
  const LAMBDA_URL = import.meta.env.VITE_LAMBDA_API_URL || '';

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResponse('');
    try {
      const res = await fetch(LAMBDA_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      if (data.response) setResponse(data.response);
      else setError(data.error || 'No response from chatbot.');
    } catch (err) {
      setError('Error: ' + err.message);
    }
    setLoading(false);
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 my-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-2">Chatbot Demo</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <textarea
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          rows={3}
          placeholder="Type your prompt..."
          className="border rounded p-2"
          required
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
          disabled={loading || !prompt.trim()}
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>
      {response && (
        <div className="mt-4 p-2 bg-green-100 dark:bg-green-900 rounded">
          <strong>Response:</strong> {response}
        </div>
      )}
      {error && (
        <div className="mt-4 p-2 bg-red-100 dark:bg-red-900 rounded text-red-700 dark:text-red-200">
          {error}
        </div>
      )}
    </div>
  );
}
