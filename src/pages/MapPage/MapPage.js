import React, { useState, useContext } from "react";
import mapContext from "../components/mapContext";

import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import mapStyle from "./Style/mapStyle";
import "./Style/map.css";

const libraries = ["places"];
const mapContainerStyle = {
  width: "92vw",
  height: "60vh",
};
const options = {
  styles: mapStyle,
};

export default function MapPage(props) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const [showInfo, setShowInfo] = useState(false);
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);
  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);
  const { selectedPillStore } = useContext(mapContext);

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
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        center={props.center}
        options={options}
        onLoad={onMapLoad}
      >
        <Locate panTo={panTo} />
        <Marker
          key="1"
          position={props.center}
          icon={{
            url:
              "https://cdn1.iconfinder.com/data/icons/drugs-24/64/dispensary-drugstore-medication-pharmacy-512.png",
            scaledSize: new window.google.maps.Size(40, 40),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(15, 15),
          }}
          onClick={() => {
            setShowInfo(true);
          }}
        />
        {showInfo ? (
          <InfoWindow
            position={props.center}
            onCloseClick={() => {
              setShowInfo(false);
            }}
          >
            <div>
              <h2>{selectedPillStore.pharmacy}</h2>
              <p>{selectedPillStore.location}</p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
}

function Locate({ panTo }) {
  const [myLocation, setMyLocation] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  return (
    <div>
      <button
        className="locate"
        onClick={() => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const latlng = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };
              setMyLocation(latlng);
              panTo({
                lat: latlng.lat,
                lng: latlng.lng,
              });
            },
            () => null
          );
        }}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Circle-icons-gps.svg/1024px-Circle-icons-gps.svg.png"
          alt="locate me"
        />
      </button>
      <Marker
        key="2"
        position={myLocation}
        icon={{
          url: "https://webstockreview.net/images/gps-clipart-gps-icon-19.png",
          scaledSize: new window.google.maps.Size(30, 40),
          origin: new window.google.maps.Point(0, 0),
          anchor: new window.google.maps.Point(15, 15),
        }}
        onClick={() => {
          setShowInfo(true);
        }}
      />
      {showInfo ? (
        <InfoWindow
          position={myLocation}
          onCloseClick={() => {
            setShowInfo(false);
          }}
        >
          <div>
            <h2>Your location</h2>
          </div>
        </InfoWindow>
      ) : null}
    </div>
  );
}
