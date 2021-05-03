import React, { useState, useContext, useCallback } from "react";
import MapContext from "../components/MapContext";

import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import { mapStyle } from "./Style/mapStyle.js";
import "./Style/map.css";

import { useLocation } from "react-router-dom";

//------------map style--------------------
const libraries = ["places"];
const options = {
  styles: mapStyle,
};

export default function MapPage() {
  //--------------map load-------------------
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });
  const mapRef = React.useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  //--------for function focus center---------
  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  //---------attibute------------
  const {
    selectedPillStore,
    center,
    setCenter,
    setIsSelect,
    access,
    pillStoreList,
    tempSelected,
    setTempSelected,
  } = useContext(MapContext);
  const [selected, setSelected] = useState(null);
  const onMapClick = useCallback(
    (event) => {
      setSelected(null);
      setIsSelect(false);
      setCenter({
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      });
    },
    [setCenter, setIsSelect]
  );

  //----------check path------------
  const location = useLocation();
  const isHomePath = location.pathname === "/home";
  const [directionURL, setDirectionURL] = useState("");

  //--------check loading-----------
  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  return (
    <>
      <GoogleMap
        id="map"
        mapContainerClassName={
          isHomePath
            ? "w-11/12 h-full max-h-124 max-w-5xl rounded-b-none rounded-xl filter drop-shadow-md "
            : "w-10/12 sm:w-full h-92 sm:h-full sm:max-h-148 sm:ml-12 sm:mt-16 rounded-md"
        }
        zoom={14}
        center={center}
        options={options}
        onLoad={onMapLoad}
        onClick={onMapClick}
      >
        <MapContext.Provider value={{ setSelected, setCenter }}>
          <Locate panTo={panTo} />
        </MapContext.Provider>

        {pillStoreList.map(
          (pillStore) =>
            pillStore.ID !== selectedPillStore.ID &&
            (isHomePath ? (
              //--------For HomePage--------------
              <Marker
                key={pillStore.ID}
                position={pillStore.coordinate}
                icon={
                  pillStore.status
                    ? {
                        url: "https://i.imgur.com/Ist6wBW.png", // blue
                        scaledSize: new window.google.maps.Size(40, 40),
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(15, 15),
                      }
                    : {
                        url: "https://i.imgur.com/v4dw84y.png", //red
                        scaledSize: new window.google.maps.Size(40, 40),
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(15, 15),
                      }
                }
                onClick={() => {
                  setSelected(pillStore);
                  setDirectionURL(
                    "https://www.google.com/maps/dir//" +
                      pillStore.coordinate.lat.toString() +
                      "," +
                      pillStore.coordinate.lng.toString()
                  );
                }}
              />
            ) : //----------For PillStorePage--------------------

            pillStore.status ? (
              <Marker
                key={pillStore.ID}
                position={pillStore.coordinate}
                icon={
                  pillStore.ID !== tempSelected.ID
                    ? {
                        url: "https://i.imgur.com/Ist6wBW.png", // blue
                        scaledSize: new window.google.maps.Size(40, 40),
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(15, 15),
                      }
                    : {
                        url: "https://i.imgur.com/AKxj5NZ.png", //blue selected
                        scaledSize: new window.google.maps.Size(43, 43),
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(15, 15),
                      }
                }
                onClick={() => {
                  setSelected(pillStore);
                  setTempSelected(pillStore);
                  setIsSelect(true);
                  setDirectionURL(
                    "https://www.google.com/maps/dir//" +
                      pillStore.coordinate.lat.toString() +
                      "," +
                      pillStore.coordinate.lng.toString()
                  );
                }}
              />
            ) : (
              !access && (
                <Marker
                  key={pillStore.ID}
                  position={pillStore.coordinate}
                  icon={{
                    url: "https://i.imgur.com/v4dw84y.png", //red
                    scaledSize: new window.google.maps.Size(40, 40),
                    origin: new window.google.maps.Point(0, 0),
                    anchor: new window.google.maps.Point(15, 15),
                  }}
                  onClick={() => {
                    setSelected(pillStore);
                    setTempSelected(pillStore);
                    setIsSelect(false);
                    setDirectionURL(
                      "https://www.google.com/maps/dir//" +
                        pillStore.coordinate.lat.toString() +
                        "," +
                        pillStore.coordinate.lng.toString()
                    );
                  }}
                />
              )
            ))
        )}
        <Marker
          //---------------Selected PillStore--------------
          key={selectedPillStore.ID}
          position={selectedPillStore.coordinate}
          icon={{
            url: "https://i.imgur.com/Ei2X1hR.png", //green
            scaledSize: new window.google.maps.Size(40, 40),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(15, 15),
          }}
          onClick={() => {
            setSelected(selectedPillStore);
            if (!isHomePath) {
              setTempSelected(selectedPillStore);
              setIsSelect(true);
            }
            setDirectionURL(
              "https://www.google.com/maps/dir//" +
                selectedPillStore.coordinate.lat.toString() +
                "," +
                selectedPillStore.coordinate.lng.toString()
            );
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
              <h2 className="font-sans text-md">{selected.pharmacy}</h2>
              <p className="font-sans">{selected.location}</p>
              <a
                className="font-sans flex flex-row justify-center items-center text-blue-500 underline"
                href={directionURL}
                target="_blank"
              >
                ค้นหาเส้นทาง
                <img
                  className="ml-1.5"
                  src="https://i.imgur.com/9UtqOGg.png"
                  width="25"
                  alt="Directions"
                />
              </a>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </>
  );
}

//---------------------Find My Location-------------------
function Locate({ panTo }) {
  const [myLocation, setMyLocation] = useState(null);
  const { setSelected, setCenter } = useContext(MapContext);
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
              setCenter(latlng);
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
