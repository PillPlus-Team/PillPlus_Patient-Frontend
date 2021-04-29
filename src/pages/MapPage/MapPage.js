import React, { useState, useContext, useEffect } from "react";
import mapContext from "../components/mapContext";

import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";

import mapStyle from "./Style/mapStyle.js";
import "./Style/map.css";

//------------map style--------------------
const libraries = ["places"];
const mapContainerStyle = {
  width: "92vw",
  height: "52vh",
  maxWidth: "1024px",
  borderRadius: "0.5rem 0.5rem 0rem 0rem",
  boxShadow: "5px 10px 10px rgba(0,0,0,0.1)"

};
const options = {
  styles: mapStyle,
};

export default function MapPage() {
  //--------------map load-------------------
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  //--------for function focus center---------
  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  //---------attibute------------
  const { selectedPillStore } = useContext(mapContext);
  const [selected, setSelected] = useState(null);
  const [pillStoreList, setPillStoreList] = useState([]);

  //---------fetch data----------
  useEffect(() => {
    const fetchLocations = async () => {
      const res = await fetch("http://localhost:5000/pillStores");
      const data = await res.json();

      setPillStoreList(data);
    };

    fetchLocations();
  }, []);

  //-------check loading-----------
  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  return (
    <div>
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        center={selectedPillStore.coordinate}
        options={options}
        onLoad={onMapLoad}
      >
        <Locate panTo={panTo} />

        {pillStoreList.map(
          (pillStore) =>
            pillStore.id != selectedPillStore.id &&
            (pillStore.status ? (
              <Marker
                key={pillStore.id}
                position={pillStore.coordinate}
                icon={{
                  url: "https://i.imgur.com/Ist6wBW.png", // blue
                  scaledSize: new window.google.maps.Size(40, 40),
                  origin: new window.google.maps.Point(0, 0),
                  anchor: new window.google.maps.Point(15, 15),
                }}
                onClick={() => {
                  console.log(selectedPillStore.coordinate);
                  setSelected(pillStore);
                }}
              />
            ) : (
              <Marker
                key={pillStore.id}
                position={pillStore.coordinate}
                icon={{
                  url: "https://i.imgur.com/v4dw84y.png", //red 
                  scaledSize: new window.google.maps.Size(40, 40),
                  origin: new window.google.maps.Point(0, 0),
                  anchor: new window.google.maps.Point(15, 15),
                }}
                onClick={() => {
                  console.log(selectedPillStore.coordinate);
                  setSelected(pillStore);
                }}
              />
            ))
        )}
        <Marker
          key={selectedPillStore.id}
          position={selectedPillStore.coordinate}
          icon={{
            url: "https://i.imgur.com/Ei2X1hR.png", //green
            scaledSize: new window.google.maps.Size(40, 40),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(15, 15),
          }}
          onClick={() => {
            setSelected(selectedPillStore);
          }}
        />
        {selected ? (
          <InfoWindow
            position={selected.coordinate}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h2>{selected.pharmacy}</h2>
              <p>{selected.location}</p>
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
