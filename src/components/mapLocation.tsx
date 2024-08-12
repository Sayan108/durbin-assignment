import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const MyLocationMarker = (props: any) => {
  const { position } = props;
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position, 13);
    }
  }, [position, map]);

  if (!position) return null;

  return (
    <Marker
      position={position}
      icon={L.icon({
        iconUrl: "https://leafletjs.com/examples/custom-icons/leaf-orange.png",
        shadowUrl:
          "https://leafletjs.com/examples/custom-icons/leaf-shadow.png",
        iconSize: [38, 95],
        shadowSize: [50, 64],
        iconAnchor: [22, 94],
        shadowAnchor: [4, 62],
        popupAnchor: [-3, -76],
      })}
    >
      <Popup>Your current location</Popup>
    </Marker>
  );
};

const MyMapComponent = () => {
  const [position, setPosition] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleSuccess = (pos: GeolocationPosition) => {
      const { latitude, longitude } = pos.coords;
      setPosition([latitude, longitude]);
      console.log(position);
      setError(null);
    };

    const handleError = (err: GeolocationPositionError) => {
      console.error(err);
      switch (err.code) {
        case err.PERMISSION_DENIED:
          setError("User denied the request for Geolocation.");
          break;
        case err.POSITION_UNAVAILABLE:
          setError("Location information is unavailable.");
          break;
        case err.TIMEOUT:
          setError("The request to get user location timed out.");
          break;
        default:
          setError("An unknown error occurred.");
          break;
      }
    };

    if (navigator.geolocation) {
      const watcher = navigator.geolocation.watchPosition(
        handleSuccess,
        handleError,
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );

      // Cleanup function to remove the watcher
      return () => navigator.geolocation.clearWatch(watcher);
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, [position]);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      {error && <div style={{ color: "red", padding: "10px" }}>{error}</div>}
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MyLocationMarker position={position} />
      </MapContainer>
    </div>
  );
};

export default MyMapComponent;
