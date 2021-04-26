import Button from "../../components/Button";
import mapContext from "../../components/mapContext";
import React, { useContext } from "react";

const PillStore = ({ pillStore }) => {
  const { setSelect, setSelectedPillStore } = useContext(mapContext);

  return (
    <button
      onClick={() => {
        setSelectedPillStore(pillStore);
        setSelect(true);
      }}
      className="group flex flex-row flex-wrap items-center justify-center bg-white hover:bg-gray-100 focus:bg-blue-500 focus:outline-none p-5 m-1 w-10/12 sm:max-w-screen-sm h-auto  rounded-lg ring-2 ring-gray-300 "
    >
      <div className="flex flex-col w-80 mx-2 flex-grow ">
        <h2 className="text-xl group-focus:text-white">{pillStore.pharmacy}</h2>
        <h3 className="text-gray-400 line-clamp-3 sm:line-clamp-2 group-hover:text-gray-400 group-focus:text-gray-300">
          {pillStore.location}
        </h3>
      </div>

      <h3
        className={`${
          pillStore.status
            ? "bg-green-100 text-green-500 group-focus:bg-green-500 group-focus:text-white"
            : "bg-red-200 text-red-500"
        } 
                        p-3 mx-2 mt-3 md:mt-0 w-40 text-center flex-grow`}
      >
        {pillStore.status ? "สามารถไปรับยาได้" : "ไม่สามารถไปรับยาได้"}
      </h3>

      <Button
        title="map"
        className="p-3 mx-2  mt-3 md:mt-0 px-5 flex-grow group-focus:bg-blue-800"
      />
    </button>
  );
};

export default PillStore;
