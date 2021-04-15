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

    const [filter, setFilter] = useState("")    //filter string
    const [access, setAccess] = useState(true) //checkbox
    const [select, setSelect] = useState(false)

    //************** FOR ALL LOCATIONS END **************
    

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
                onBackpage= {() => {
                    history.push('/home')
                }}
            />

            <h1 className='text-lg sm:text-2xl mb-2 text-gray-600'> เปลี่ยนสถานที่รับยา</h1>






            {/*We need Map feature here*/}    






            
            <FilterBar 
                className = 'my-2 w-10/12 sm:max-w-screen-sm h-full '
                description = 'ค้นหา...' // ชื่อร้าน, ที่อยู่
                onChange={(event) => {
                    setFilter(event.target.value) //change filter string
                }}
                onCheck={() => {
                    setAccess(!access)  //change checkbox
                }}
                value={filter}  //filter string
                access={access} //checkbox
            />
        
            <LocationList 
                locationList={locationList}
                filter={filter} //filter string
                access={access} //checkbox
            />
            
            {render &&
            <div className='flex flex-row justify-center w-10/12 h-full mb-8'>

                {/*may delete in the future... wait for google map*/}
                <Button 
                    title='ยืนยัน'
                    className={`mt-6 w-32 sm:w-48 h-11 mx-2 sm:mx-3 disabled:opacity-50 ${!select ? "pointer-events-none":" " }`}
                    onClick={()=> history.push('/home')}
                    disabled={!select} // make it true for default (disable = true at first time)
                />
            </div>
            }

  
        </div>
    )
}

export default LocationPage
