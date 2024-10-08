import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import L from "leaflet";

import "leaflet/dist/leaflet.css";

const defaultIcon = L.icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const VehicleMap = () => {
  const [vehicleLocation, setVehicleLocation] = useState([
    17.385044, 78.486671,
  ]);
  const [routePath, setRoutePath] = useState([[17.385044, 78.486671]]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch("https://mapbackend-1rvx.onrender.com/api/vehicle-location")
        .then((res) => res.json())
        .then((data) => {
          const newLocation = [data.latitude, data.longitude];
          setVehicleLocation(newLocation);
          setRoutePath((prevPath) => [...prevPath, newLocation]);
        })
        .catch((error) =>
          console.error("Error fetching vehicle location:", error)
        );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <MapContainer
      center={vehicleLocation}
      zoom={15}
      style={{ height: "900px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      <Marker position={vehicleLocation} icon={defaultIcon} />

      <Polyline positions={routePath} color="blue" />
    </MapContainer>
  );
};

export default VehicleMap;
