import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import { useEffect, useRef, useState } from "react";
import { socket } from "../socket";
import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";

// 🔵 DEFAULT ICON (CUSTOMER)
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// ⚫ BLACK DRIVER ICON
const driverIcon = new L.Icon({
  iconUrl: "https://maps.gstatic.com/mapfiles/ms2/micons/black-dot.png",
  iconSize: [32, 32],
});

// 🔵 CUSTOMER ICON
const customerIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// 📏 DISTANCE FUNCTION
const getDistanceKm = (a, b) => {
  const R = 6371;
  const dLat = ((b[0] - a[0]) * Math.PI) / 180;
  const dLng = ((b[1] - a[1]) * Math.PI) / 180;

  const lat1 = (a[0] * Math.PI) / 180;
  const lat2 = (b[0] * Math.PI) / 180;

  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);

  return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
};

// 🚀 ROUTING
function Routing({ pickupCoords, dropCoords, setDistance, setSteps }) {
  const map = useMap();
  const routingRef = useRef(null);

  useEffect(() => {
    if (!pickupCoords || !dropCoords) return;

    if (routingRef.current) {
      map.removeControl(routingRef.current);
    }

    routingRef.current = L.Routing.control({
      waypoints: [
        L.latLng(pickupCoords[0], pickupCoords[1]),
        L.latLng(dropCoords[0], dropCoords[1]),
      ],
      routeWhileDragging: false,
      addWaypoints: false,
      show: false,
      createMarker: () => null,
      lineOptions: {
        styles: [{ color: "red", weight: 4 }],
      },
    }).addTo(map);

    routingRef.current.hide();
    if (routingRef.current._container) {
      routingRef.current._container.style.display = "none";
    }

    routingRef.current.on("routesfound", (e) => {
      const route = e.routes[0];

      const km = route.summary.totalDistance / 1000;
      setDistance(km.toFixed(2));

      const steps = route.instructions.map((i) => i.text);
      setSteps(steps);
    });
  }, [pickupCoords, dropCoords]);

  return null;
}

// 🚀 MAIN MAP
export default function Map({
  role = "customer",
  pickupCoords,
  dropCoords,
  setDistance,
  setSteps,
}) {
  const [userPos, setUserPos] = useState([11, 78]);
  const [drivers, setDrivers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [peaks, setPeaks] = useState([]);

  // 📍 TRACK USER
  useEffect(() => {
    navigator.geolocation.watchPosition((pos) => {
      const coords = [pos.coords.latitude, pos.coords.longitude];
      setUserPos(coords);

      socket.emit("locationUpdate", {
        role,
        lat: coords[0],
        lng: coords[1],
      });
    });
  }, []);

  // 📡 RECEIVE USERS (BOTH SIDES)
  useEffect(() => {
    socket.on("locationBroadcast", (data) => {
      if (data.role === "driver") {
        setDrivers((prev) => [...prev, [data.lat, data.lng]]);
      } else {
        setCustomers((prev) => [...prev, [data.lat, data.lng]]);
      }
    });
  }, []);

  // 🔥 PEAK ZONE
  useEffect(() => {
    const peakZones = [];

    customers.forEach((c) => {
      let count = 0;

      customers.forEach((other) => {
        const dist = getDistanceKm(c, other);
        if (dist <= 3) count++;
      });

      if (count >= 3) peakZones.push(c);
    });

    setPeaks(peakZones);
  }, [customers]);

  // DEMO DRIVERS
  const dummyDrivers = [
    [11.1, 78.7],
    [11.2, 78.8],
    [11.05, 78.6],
  ];

  return (
    <MapContainer center={userPos} zoom={7} className="h-full w-full">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* ROUTE */}
      <Routing
        pickupCoords={pickupCoords}
        dropCoords={dropCoords}
        setDistance={setDistance}
        setSteps={setSteps}
      />

      {/* 🧍 CURRENT USER */}
      <Marker position={userPos} icon={customerIcon}>
        <Popup>You ({role})</Popup>
      </Marker>

      {/* 🚕 DRIVERS (BLACK) */}
      {drivers.map((d, i) => (
        <Marker key={i} position={d} icon={driverIcon}>
          <Popup>Driver 🚕</Popup>
        </Marker>
      ))}

      {/* 👤 CUSTOMERS */}
      {customers.map((c, i) => (
        <Marker key={"cust" + i} position={c} icon={customerIcon}>
          <Popup>Customer 👤</Popup>
        </Marker>
      ))}

      {/* DEMO DRIVERS */}
      {dummyDrivers.map((d, i) => (
        <Marker key={"demo" + i} position={d} icon={driverIcon}>
          <Popup>Demo Driver 🚗</Popup>
        </Marker>
      ))}

      {/* 🔴 PEAK ZONES */}
      {peaks.map((p, i) => (
        <Circle
          key={i}
          center={p}
          radius={3000}
          pathOptions={{ color: "red", dashArray: "5,10" }}
        />
      ))}
    </MapContainer>
  );
}