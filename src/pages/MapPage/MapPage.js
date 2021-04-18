import React from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  MarkerClusterer,
} from "@react-google-maps/api";
import { formatRelative } from "date-fns";

import mapStyle from "./Style/mapStyle";
import "./Style/map.css";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};
const center = {
  lat: 13.756331,
  lng: 100.501762,
};
const options = {
  styles: mapStyle,
  //   disableDefaultUI: true,
  //   zoomControl: true,
};

export default function MapPage() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";
  return (
    <div>
      <h1 className="mapText">
        PillPlus{" "}
        <span role="img" aria-label="pill">
          💊
        </span>
      </h1>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
      >
        <Marker position={center} />
      </GoogleMap>
    </div>
  );
}
