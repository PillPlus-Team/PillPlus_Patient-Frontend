import MapContext from "../../components/MapContext";
import React, { useContext } from "react";

const PillStore = ({ pillStore }) => {
  
  const { tempSelected, setIsSelect, selectedPillStore, setTempSelected, setCenter, center } = useContext(MapContext);

  const checkIfSelected = () => {
    // UserSelectPillStore === pillStoreID now? 
    return selectedPillStore.ID === pillStore.ID
  }

  const checkIsOnFocus = () => {
    return (tempSelected.ID === pillStore.ID) && !(selectedPillStore.ID === tempSelected.ID) 
  }

  return (
    <button
      onClick={() => {
        setTempSelected(pillStore);
        pillStore.status ? setIsSelect(true) : setIsSelect(false);
        center !== pillStore.coordinate
          ? setCenter(pillStore.coordinate)
          : setCenter({
              lat: pillStore.coordinate.lat + 0.000001,
              lng: pillStore.coordinate.lng + 0.000001,
            });
      }}
      // min-h-full sm:min-h-1
      className= {`disabled:opacity-50 ${checkIsOnFocus()? "bg-blue-500 focus:bg-blue-500 hover:bg-blue-500 pointer-events-none " : " bg-white hover:bg-gray-200 "} ${checkIfSelected() ? "pointer-events-none ":" " } group flex flex-row flex-wrap lg:flex-nowrap items-center justify-center  focus:outline-none outline-none p-5 w-full h-full max-h-48 duration-300`} 
      disabled={checkIfSelected()}
    >
      <div className="flex flex-col w-80 mx-2 flex-grow-8 ">
        <h2 className={`${checkIsOnFocus()? "group-focus:text-white text-white group-hover:text-white" : " text-gray-800 group-hover:text-black"}  text-lg sm:text-xl duration-200`}> 
          {pillStore.pharmacy}
        </h2>
        <h3 className={`${checkIsOnFocus()? "group-focus:text-gray-300 text-gray-300 group-hover:text-gray-300" : " text-gray-500 group-hover:text-gray-700"}  text-sm sm:text-md line-clamp-3 sm:line-clamp-2 duration-200`}>
          {pillStore.location}
        </h3>
      </div>

      {!checkIfSelected() ?
        <h3
          className={`duration-300 text-md sm:text-base 
          ${(!checkIsOnFocus() && pillStore.status)? "bg-green-100 text-green-500 ": " "} 
          ${(!checkIsOnFocus() && !pillStore.status)? "bg-red-200 text-red-500 ": " "}   
          ${(checkIsOnFocus() && pillStore.status)? "group-focus:bg-green-500 group-focus:text-white bg-green-500 text-white " : " "}  
          ${(checkIsOnFocus() && !pillStore.status)? "group-focus:bg-red-300 group-focus:text-red-500 bg-red-300 text-red-500 ":" "}                   
                                                  p-3 mx-2 mt-3 md:mt-0 w-40 text-center flex-grow`}
        >
          {pillStore.status ? "สามารถไปรับยาได้" : "ไม่สามารถไปรับยาได้"}
        </h3>
        :
        <h3 
          className="bg-blue-200 text-blue-700 duration-300 text-md sm:text-base p-3 mx-2 mt-3 md:mt-0 w-40 text-center flex-grow"
        >
          สถานที่เลือกรับยา
        </h3>
      
      }

      {/* <Button
        title="map"
        className="duration-500 text-md sm:text-base p-3 mx-2  mt-3 md:mt-0 px-5 flex-grow group-focus:bg-blue-800"
      /> */}
    </button>
  );
};

export default PillStore;
