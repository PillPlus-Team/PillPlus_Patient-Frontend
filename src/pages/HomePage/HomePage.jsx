import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import Header from '../components/Header'
import Button from '../components/Button'
import MapPage from '../MapPage/MapPage'
import SelectPillStore from './components/SelectPillStore'
import MapContext from '../components/MapContext';

const HomePage = () => {

    //************** FOR PATIENT USER START **************
    const history = useHistory()
    const [profile, setProfile] = useState({})      // the login selected one (only 1) 
    const [selectedPillStore, setSelectedPillStore] = useState({})
    const [center, setCenter] = useState({"lat": 15.039960,
    "lng": 100.178123})
    
    const [isAuth, setIsAuth] = useState(true)  // Authentication mockup

    //get patient receipts user profile data 
    useEffect(() => {
        const fetchProfile = async (id) => {
            const res = await fetch(`http://localhost:5500/receipts/${id}`)
            const data = await res.json()

            setProfile(data)
            setSelectedPillStore(data.pillStore)
            setCenter(data.pillStore.coordinate)
            setRender(true)
        }
        
        fetchProfile("1101402227500") // set manually from mockup
    },[])   

    //************** FOR PATIENT USER END **************

    const [render, setRender] = useState(false) // check if list already load and display bottom part (2 buttons) 
    // don't make it load before locations

    return (
        <div className='flex flex-col justify-start items-center w-screen h-screen'>
            <Header 
                title='PILLPLUS+'
                className='py-2 sm:py-4'
                name= {profile.name}
                onClick={() => {
                    setIsAuth(false)
                    history.push('/login')
                }}
            />

            <h1 className='mb-3 text-gray-800 text-lg sm:text-2xl text-center'> 
                สถานที่รับยา
            </h1>
            
            <MapContext.Provider value={{selectedPillStore, center, setCenter}}>
                <MapPage />
            
            {/* don't delete this line : just keep it for decoration when you put your map already: w-5/12 max-w-md h-full */}

            {render && 
                <SelectPillStore 
                    pharmacy={selectedPillStore.pharmacy}
                    location={selectedPillStore.location}
                /> 
            }
            </MapContext.Provider>

            {render && 
                <Button 
                title='เปลี่ยนสถานที่รับยา'
                className='my-2 mt-5 w-6/12 sm: max-w-xs '
                onClick={()=> history.push('/pillstore')}
                /> 
            }
        
            {render &&
                <Button 
                title='ดูรายการยา'
                className='my-2 mb-4 w-6/12 sm: max-w-xs '
                onClick={()=> history.push('/pill')}
                />
            }
  
        </div>
    )
}

export default HomePage
