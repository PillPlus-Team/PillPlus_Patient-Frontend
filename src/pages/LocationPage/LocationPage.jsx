import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import Header from '../components/Header'
import Button from '../components/Button'
import LocationList from './components/LocationList'

const LocationPage = () => {

    const history = useHistory()
    const [profile, setProfile] = useState({})      // the login selected one (only 1) 

    // fetch (only 1)
    useEffect(() => {
        const fetchProfile = async (id) => {
            const res = await fetch(`http://localhost:5000/patients/${id}`)
            const data = await res.json()

            setProfile(data)
        }

        fetchProfile("1234567890123") // set manually 
    },[])   

    const [isAuth, setIsAuth] = useState(true)  



    const [locationList, setLocationList] = useState([])
    const [render, setRender] = useState(false) // check if list already load and display bottom part (2 buttons) 
                                                // don't make it load before locations
  
    useEffect(() => {
        const fetchLocations = async () => {
            const res = await fetch('http://localhost:5000/locations')
            const data = await res.json()
  
            setLocationList(data)
            setRender(true)
        }
  
        fetchLocations()
    },[])



    return (
        <div className='flex flex-col justify-start items-center w-screen h-full'>
            <Header 
                title='PILLPLUS+'
                className='py-8'
                name= {profile.name}
                surname= {profile.surname}
                onClick={() => {
                    setIsAuth(false)
                    history.push('/login')
                }}
            />


            <h1 className='text-lg sm:text-2xl pb-4 text-gray-600'> เลือกสถานที่รับยา</h1>

            {/* under construction */}
            <input 
                className='bg-white p-1 pl-5 m-2 w-10/12 sm:max-w-screen-sm rounded-xl'                         
                type="text"
                //name="filter"
                onChange={(event) => {
                    //setUsername(event.target.value);
                }}
                placeholder="ค้นหา ... ชื่อร้าน, ที่อยู่"
                //value={username}
            />
            
            {/*We need list of Location here*/}
            <LocationList locationList={locationList}/>
            
            {render &&
            <div className='flex flex-row justify-center w-10/12 h-full mb-8'>
                <Button 
                    title='ย้อนกลับ'
                    className='mt-6 w-32 h-11 mx-2 sm:mx-3'
                    onClick={()=> history.push('/home')}
                />



                {/*may delete in the future... wait for google map*/}
                <Button 
                    title='ยืนยัน'
                    className='mt-6 w-32 h-11 mx-2 sm:mx-3 '
                    onClick={()=> history.push('/home')}
                />
            </div>
            }

  
        </div>
    )
}

export default LocationPage
