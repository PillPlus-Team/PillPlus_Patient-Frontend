import { useState } from 'react';
import Header from '../components/Header'
import Button from '../components/Button'

const HomePage = () => {
    return (
        <div className='flex flex-col justify-start items-center w-screen h-screen'>
            <Header 
                title='PILLPLUS+'
                className='py-8'
            />


            <h1 className='text-lg sm:text-2xl pb-4 text-gray-600'> สถานที่รับยา</h1>
            
            {/*We need Map feature here*/}
            <img className='w-9/12 sm:max-w-screen-md' src="https://miro.medium.com/max/4064/1*qYUvh-EtES8dtgKiBRiLsA.png" alt="map feature"/>
           
            <Button 
                title='เปลี่ยนสถานที่'
                className='mt-6 w-6/12 sm: max-w-xs'
            />
            <Button 
                title='ดูรายการยา'
                className='mt-4 w-6/12 sm: max-w-xs'
            />
  
        </div>
    )
}

export default HomePage
