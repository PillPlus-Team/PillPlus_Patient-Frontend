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
            description: 'jaroenkung road soi 5 moo 6 l a d g r a b a n g bkk 1000220',
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
            description: 'jaroenkung road soi 5 moo 6' ,
            status: false
        },
        {
            id: 4,
            title: 'phamarcy 4',
            description: 'jaroenkung road soi 5 moo 6 ladgrabang bkk asdasdasd',
            status: false
        },
        {
            id: 5,
            title: 'phamarcy 5',
            description: 'jaroenkung road soi 5 moo 6 ladgrabang bkk a xxxxxxxxxxxxx',
            status: true
        },
        {
            id: 6,
            title: 'phamarcy 6',
            description: 'jaroenkung road soi 5 moo 6 ladgrabang bkk a xxasssxxxx',
            status: true
        },
    ])


    return (
        <div className='flex flex-col justify-start items-center w-screen h-full'>
            <Header 
                title='PILLPLUS+'
                className='py-8'
            />


            <h1 className='text-lg sm:text-2xl pb-4 text-gray-600'> เลือกสถานที่รับยา</h1>
            
            {/*We need list of Location here*/}
            <LocationList locationList={locationList}/>
            
            <div className='flex flex-row justify-center w-10/12 h-full mb-8'>
                <Button 
                    title='ย้อนกลับ'
                    className='mt-6 w-32 h-11 mx-2 sm:mx-3'
                />
                <Button 
                    title='ยืนยัน'
                    className='mt-6 w-32 h-11 mx-2 sm:mx-3 '
                />
            </div>

  
        </div>
    )
}

export default LocationPage
