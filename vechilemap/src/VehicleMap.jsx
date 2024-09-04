import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

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
    }, 700);

    return () => clearInterval(interval);
  }, []);

  return (
    <MapContainer
      center={vehicleLocation}
      zoom={13}
      style={{ height: "900px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      <Marker position={vehicleLocation} />

      <Polyline positions={routePath} color="blue" />
    </MapContainer>
  );
};

export default VehicleMap;
