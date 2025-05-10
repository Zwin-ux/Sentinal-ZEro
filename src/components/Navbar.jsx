import useStore from "../state/store";

import React from "react";
export default function Navbar() {
  const theme = useStore((s) => s.theme);
  const setTheme = useStore((s) => s.setTheme);
  const user = useStore((s) => s.user);
  const selectedRegion = useStore((s) => s.selectedRegion);
  const setSelectedRegion = useStore((s) => s.setSelectedRegion);

  const regions = ["Tokyo", "San Francisco", "Frankfurt"];

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-gray-900 shadow-md">
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold text-blue-400">Sentinel Zero</span>
        <div className="ml-6 flex gap-2">
          {regions.map((r) => (
            <button
              key={r}
              onClick={() => setSelectedRegion(r)}
              className={`px-3 py-1 rounded transition-all duration-200 font-medium ${
                selectedRegion === r
                  ? "bg-blue-700 text-white scale-105 shadow"
                  : "bg-gray-800 text-blue-200 hover:bg-blue-800 hover:text-white"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="flex items-center px-2 py-1 rounded bg-gray-800 hover:bg-gray-700 transition-all duration-200"
          aria-label="Toggle dark mode"
        >
          {theme === "dark" ? (
            <span className="material-icons text-yellow-400">dark_mode</span>
          ) : (
            <span className="material-icons text-blue-600">light_mode</span>
          )}
        </button>
        {user && (
          <span className="text-sm text-blue-200">
            {user.email} <span className="ml-1 px-2 py-0.5 rounded bg-blue-900 text-blue-300 text-xs font-semibold">{user.role}</span>
          </span>
        )}
      </div>
    </nav>
  );
}
