import React from 'react'

const SelectPillStore = ({pharmacy, location}) => {
    return (
        <div className='flex flex-col justify-center items-center m-4 p-4 rounded-xl bg-white'>
            <h1 className='text-lg sm:text-2xl p-2 text-gray-800'>ชื่อร้าน : {pharmacy}</h1>
            <h1 className='text-md sm:text-lg p-2 text-gray-500'>{location}</h1>
        </div>
    )
}

export default SelectPillStore
