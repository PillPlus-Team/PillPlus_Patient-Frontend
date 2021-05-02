// import Button from "../../components/Button";
import MapContext from "../../components/MapContext";
import React, { useContext } from "react";

const PillStore = ({ pillStore }) => {
  const { setIsSelect, setSelectedPillStore, setCenter, center } = useContext(
    MapContext
  );

  return (
    <button
      onClick={() => {
        setSelectedPillStore(pillStore);
        setIsSelect(true);
        center !== pillStore.coordinate
          ? setCenter(pillStore.coordinate)
          : setCenter({
              lat: pillStore.coordinate.lat + 0.000001,
              lng: pillStore.coordinate.lng + 0.000001,
            });
      }}
      className="group flex flex-row flex-wrap lg:flex-nowrap items-center justify-center bg-white hover:bg-gray-200 focus:bg-blue-500 focus:outline-none outline-none p-5 w-full h-full focus:ring-blue-500 duration-300"
    >
      <div className="flex flex-col w-80 mx-2 flex-grow-8">
        <h2 className="duration-200 text-lg sm:text-xl text-gray-800 group-hover:text-black group-focus:text-white">
          {pillStore.pharmacy}
        </h2>
        <h3 className="duration-200 text-sm sm:text-md text-gray-500 line-clamp-3 sm:line-clamp-2 group-hover:text-gray-700 group-focus:text-gray-300">
          {pillStore.location}
        </h3>
      </div>

      <h3
        className={`duration-300 text-md sm:text-base ${
          pillStore.status
            ? "bg-green-100 text-green-500 group-focus:bg-green-500 group-focus:text-white"
            : "bg-red-200 text-red-500"
        } 
                        p-3 mx-2 mt-3 md:mt-0 w-40 text-center flex-grow`}
      >
        {pillStore.status ? "สามารถไปรับยาได้" : "ไม่สามารถไปรับยาได้"}
      </h3>

      {/* <Button
        title="map"
        className="duration-500 text-md sm:text-base p-3 mx-2  mt-3 md:mt-0 px-5 flex-grow group-focus:bg-blue-800"
      /> */}
    </button>
  );
};

export default PillStore;
