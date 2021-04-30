import React from 'react'

const SelectPillStore = ({pharmacy, location}) => {
    return (
        <button 
            className='group flex flex-col justify-center items-center w-11/12 max-w-5xl p-4 rounded-xl rounded-t-none hover:bg-gray-100 bg-white filter drop-shadow-lg focus:outline-none outline-none duration-300 focus:bg-white'
            onClick={() => console.log("print some thing")}
        >
            <h1 className='text-lg sm:text-xl p-2 text-black group-focus:text-gray-800 duration-300'>ชื่อร้าน : {pharmacy}</h1>
            <h1 className='text-sm sm:text-md p-2 text-gray-400 group-hover:text-gray-600 group-focus:text-gray-500 duration-300'>{location}</h1>
        </button>
    )
}

export default SelectPillStore
