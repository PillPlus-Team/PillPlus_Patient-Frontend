import React, { useState, useContext, useEffect } from "react";
import MapContext from "../components/MapContext";

import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import mapStyle from "./Style/mapStyle.js";
import "./Style/map.css";

import { useLocation } from "react-router-dom";

//------------map style--------------------
const libraries = ["places"];
// const mapContainerStyle_Home = {
//   width: "91.6vw",
//   height: "52vh",
//   maxWidth: "1024px",
//   borderRadius: "0.5rem 0.5rem 0rem 0rem",
//   boxShadow: "5px 10px 10px rgba(0,0,0,0.1)"

// };
// const mapContainerStyle_PillStore = {
//   width: "50vw",
//   height: "70vh",
//   maxWidth: "1024px",
//   borderRadius: "0.5rem 0.5rem 0rem 0rem",
//   boxShadow: "5px 10px 10px rgba(0,0,0,0.1)"

// };
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
  const { selectedPillStore } = useContext(MapContext);
  const [selected, setSelected] = useState(null);
  const [pillStoreList, setPillStoreList] = useState([]);

  //---------fetch data----------
  useEffect(() => {
    const fetchLocations = async () => {
      const res = await fetch("http://localhost:5500/pillStores");
      const data = await res.json();

      setPillStoreList(data);
    };

    fetchLocations();
  }, []);

  //----------check path------------
  const location = useLocation();
  const isHomePath = location.pathname === "/home";

  //-------check loading-----------
  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  return (
    <>
      <GoogleMap
        id="map"
        mapContainerClassName={
          isHomePath
            ? "w-11/12 h-full max-h-124 max-w-5xl rounded-b-none rounded-xl"
            : "w-10/12 sm:w-full h-96 sm:h-full sm:max-h-148 sm:ml-12 sm:mt-16 rounded-md"
        }
        zoom={14}
        center={selectedPillStore.coordinate}
        options={options}
        onLoad={onMapLoad}
        onClick={() => {
          setSelected(null);
        }}
      >
        <MapContext.Provider value={{ setSelected }}>
          <Locate panTo={panTo} />
        </MapContext.Provider>

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
    </>
  );
}

function Locate({ panTo }) {
  const [myLocation, setMyLocation] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const { setSelected } = useContext(MapContext);
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
        <img src="https://i.imgur.com/KOzXDzt.png" alt="locate me" />
      </button>
      <Marker
        key="2"
        position={myLocation}
        icon={{
          scaledSize: new window.google.maps.Size(30, 40),
          origin: new window.google.maps.Point(0, 0),
          anchor: new window.google.maps.Point(15, 15),
        }}
        onClick={() => {
          setSelected({
            coordinate: myLocation,
            pharmacy: "Your location",
            location: null,
          });
        }}
      />
    </div>
  );
}
