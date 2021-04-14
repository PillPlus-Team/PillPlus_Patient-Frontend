import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import Header from '../components/Header'
import Button from '../components/Button'
import LocationList from './components/LocationList'
import FilterBar from '../components/FilterBar'



const LocationPage = () => {

    //************** FOR PATIENT USER START **************
    const history = useHistory()
    const [profile, setProfile] = useState({})      // the login selected one (only 1) 
    
    const [isAuth, setIsAuth] = useState(true)  // Authentication mockup

    //get patient user profile data 
    useEffect(() => {
        const fetchProfile = async (id) => {
            const res = await fetch(`http://localhost:5000/patients/${id}`)
            const data = await res.json()

            setProfile(data)
        }

        fetchProfile("1234567890123") // set manually from mockup
    },[])   

    //************** FOR PATIENT USER END **************

    //************** FOR ALL LOCATIONS START **************
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

    //************** FOR ALL LOCATIONS END **************

    const [filter, setFilter] = useState("")

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

            <h1 className='text-lg sm:text-2xl mb-2 text-gray-600'> เลือกสถานที่รับยา</h1>






            {/*We need Map feature here*/}    






            
            <FilterBar 
                className = 'my-2 w-10/12 sm:max-w-screen-sm h-full '
                description = 'ค้นหา ...' // ชื่อร้าน, ที่อยู่
                onChange={(event) => {
                    setFilter(event.target.value)
                }}
                value={filter}
            />
        
            <LocationList 
                locationList={locationList}
                filter={filter}
            />
            
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
