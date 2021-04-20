import React, { useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  MarkerClusterer,
} from "@react-google-maps/api";
import { formatRelative } from "date-fns";

import usePlaceAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

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
  disableDefaultUI: true,
  //   zoomControl: true,
};

export default function MapPage() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const [showInfo, setShowInfo] = useState(false);
  const mapRef = React.useRef();
  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(10);
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

      <Locate panTo={panTo} />

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
      >
        <Marker
          position={center}
          icon={{
            url:
              "https://www.flaticon.com/svg/vstatic/svg/1529/1529662.svg?token=exp=1618780506~hmac=cd25690fe612c30e05806c1be94c1bfb",
            scaledSize: new window.google.maps.Size(20, 20),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(15, 15),
          }}
          onClick={() => {
            setShowInfo(true);
          }}
        />
        {showInfo ? (
          <InfoWindow
            position={center}
            onCloseClick={() => {
              setShowInfo(false);
            }}
          >
            <div>
              <h2>Name</h2>
              <p>info</p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
}

function Locate({ panTo }) {
  return (
    <button
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition((position) => {
          panTo({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        });
      }}
    >
      <img
        src="https://www.flaticon.com/svg/vstatic/svg/143/143960.svg?token=exp=1618948688~hmac=cc9a1a93ce04a03634b5b75b58b4d2d4"
        alt="locate me"
        width="30"
      />
    </button>
  );
}
