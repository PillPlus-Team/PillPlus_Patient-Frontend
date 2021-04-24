import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { formatRelative } from "date-fns";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import usePlacesAutocomplete, {
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
  // disableDefaultUI: true,
  //   zoomControl: true,
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

      {/* <Search panTo={panTo} /> */}

      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        center={props.center}
        options={options}
        onLoad={onMapLoad}
        onClick={() => {
          console.log(props.center);
        }}
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
  const [myLocation, setMyLocation] = useState(null);
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
          url:
            "https://cdn1.iconfinder.com/data/icons/drugs-24/64/dispensary-drugstore-medication-pharmacy-512.png",
          scaledSize: new window.google.maps.Size(40, 40),
          origin: new window.google.maps.Point(0, 0),
          anchor: new window.google.maps.Point(15, 15),
        }}
      />
    </div>
  );
}

function Search({ panTo }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 43.6532, lng: () => -79.3832 },
      radius: 100 * 1000,
    },
  });

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      panTo({ lat, lng });
    } catch (error) {
      console.log("😱 Error: ", error);
    }
  };

  return (
    <div className="search">
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Search your location"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}

MapPage.defaultProps = {
  center: center,
};
