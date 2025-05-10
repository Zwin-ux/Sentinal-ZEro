import { useState } from "react";
import { supabase } from "../supabaseClient";
import useStore from "../state/store";

export default function LoginModal() {
  const user = useStore((s) => s.user);
  const setUser = useStore((s) => s.setUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [show, setShow] = useState(!user);

  // Fetch role from user_metadata or public.users table
  async function fetchRole(sessionUser) {
    // Try to get role from user_metadata
    let role = sessionUser?.user_metadata?.role;
    if (!role) {
      // Try to fetch from public.users table by id
      const { data } = await supabase.from('users').select('role').eq('id', sessionUser.id).single();
      role = data?.role || "Viewer";
    }
    return { ...sessionUser, role };
  }

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { data, error: loginError } = await supabase.auth.signInWithPassword({ email, password });
    if (loginError) {
      setError(loginError.message);
      setLoading(false);
      return;
    }
    const userWithRole = await fetchRole(data.user);
    setUser(userWithRole);
    setShow(false);
    setLoading(false);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setUser(null);
    setShow(true);
  }

  if (!show) return (
    <button onClick={handleLogout} className="fixed top-4 right-4 bg-gray-900 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition">Logout</button>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <form className="bg-gray-900 rounded-lg p-8 shadow-lg min-w-[320px] flex flex-col gap-4" onSubmit={handleLogin}>
        <h2 className="text-xl font-bold mb-2">Sign In</h2>
        <input
          className="px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-400"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          className="px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-400"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded transition"
          type="submit"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
        {error && <div className="text-red-400 text-sm">{error}</div>}
      </form>
    </div>
  );
}
