import { useState } from 'react';
import Header from '../components/Header'
import Button from '../components/Button'
import LocationList from './components/LocationList'

const LocationPage = () => {

    const [locationList, setLocationList] = useState([

        /* location data here */
        {
            id: 1,
            title: 'phamarcy 1',
            description: 'jaroenkung road soi 5 moo 6 ladgrabang bkk',
            status: true
        }, 
        {
            id: 2,
            title: 'phamarcy 2',
            description: 'jaroenkung road soi 5 moo 6 ladgrabang bkk',
            status: true
        },
        {
            id: 3,
            title: 'phamarcy 3',
            description: 'jaroenkung road soi 5 moo 6 ladgrabang bkk',
            status: false
        },
        {
            id: 4,
            title: 'phamarcy 4',
            description: 'jaroenkung road soi 5 moo 6 ladgrabang bkk',
            status: false
        },
    ])


    return (
        <div className='flex flex-col justify-start items-center w-screen h-screen'>
            <Header 
                title='PILLPLUS+'
                className='py-8'
            />


            <h1 className='text-lg sm:text-2xl pb-4 text-gray-600'> เลือกสถานที่รับยา</h1>
            
            {/*We need list of Location here*/}
            <LocationList locationList={locationList}/>
            
            <div className='flex flex-row justify-center w-full h-full'>
                <Button 
                    title='ย้อนกลับ'
                    className='mt-6 w-32 h-11 mx-3 sm: max-w-xs'
                />
                <Button 
                    title='ยืนยัน'
                    className='mt-6 w-32 h-11 mx-2 sm: max-w-xs'
                />
            </div>

  
        </div>
    )
}

export default LocationPage
