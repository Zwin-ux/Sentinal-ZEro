import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import useStore from "../state/store";

const regions = [
  {
    name: "San Francisco",
    coords: [-122.4194, 37.7749],
    id: "sf"
  },
  {
    name: "Tokyo",
    coords: [139.6917, 35.6895],
    id: "tokyo"
  },
  {
    name: "Frankfurt",
    coords: [8.6821, 50.1109],
    id: "frankfurt"
  }
];

const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

export default function WorldMap() {
  const selectedRegion = useStore((s) => s.selectedRegion);
  const setSelectedRegion = useStore((s) => s.setSelectedRegion);

  return (
    <div className="w-full max-w-3xl bg-gray-800 rounded-lg shadow p-4">
      <h2 className="text-xl font-semibold mb-2">World Region Selector</h2>
      <ComposableMap projection="geoMercator" height={250}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{
                  default: { fill: "#222", outline: "none" },
                  hover: { fill: "#444", outline: "none" },
                  pressed: { fill: "#1976d2", outline: "none" }
                }}
              />
            ))
          }
        </Geographies>
        {regions.map((region) => (
          <Marker
            key={region.id}
            coordinates={region.coords}
            onClick={() => setSelectedRegion(region.id)}
          >
            <circle
              r={selectedRegion === region.id ? 10 : 7}
              fill={selectedRegion === region.id ? "#60a5fa" : "#fff"}
              stroke="#1976d2"
              strokeWidth={2}
              className="cursor-pointer transition-all duration-200"
            />
            <text
              textAnchor="middle"
              y={-15}
              style={{ fill: "#fff", fontSize: 12 }}
            >
              {region.name}
            </text>
          </Marker>
        ))}
      </ComposableMap>
    </div>
  );
}
