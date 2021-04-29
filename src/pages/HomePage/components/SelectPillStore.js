import React from 'react'

const SelectPillStore = ({pharmacy, location}) => {
    return (
        <div 
            className='flex flex-col justify-center items-center w-11/12 max-w-5xl p-4 rounded-xl rounded-t-none bg-white hover:bg-gray-50 filter drop-shadow-lg'
            onClick={() => console.log("print some thing")}
        >
            <h1 className='text-lg sm:text-xl p-2 text-gray-800'>ชื่อร้าน : {pharmacy}</h1>
            <h1 className='text-sm sm:text-md p-2 text-gray-500'>{location}</h1>
        </div>
    )
}

export default SelectPillStore
