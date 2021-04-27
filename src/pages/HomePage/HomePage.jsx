import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import Header from '../components/Header'
import Button from '../components/Button'
import MapPage from '../MapPage/MapPage'
import SelectPillStore from './components/SelectPillStore'
import mapContext from '../components/mapContext';

const HomePage = () => {

    //************** FOR PATIENT USER START **************
    const history = useHistory()
    const [profile, setProfile] = useState({})      // the login selected one (only 1) 
    const [selectedPillStore, setSelectedPillStore] = useState({})
    
    const [isAuth, setIsAuth] = useState(true)  // Authentication mockup

    //get patient receipts user profile data 
    useEffect(() => {
        const fetchProfile = async (id) => {
            const res = await fetch(`http://localhost:5000/receipts/${id}`)
            const data = await res.json()

            setProfile(data)
            setSelectedPillStore(data.pillStore)
            setRender(true)
        }
        
        fetchProfile("1101402227500") // set manually from mockup
    },[])   

    //************** FOR PATIENT USER END **************

    const [render, setRender] = useState(false) // check if list already load and display bottom part (2 buttons) 
    // don't make it load before locations

    return (
        <div className='flex flex-col justify-start items-center w-screen h-full'>
            <Header 
                title='PILLPLUS+'
                className='py-8'
                name= {profile.name}
                onClick={() => {
                    setIsAuth(false)
                    history.push('/login')
                }}
            />


            <h1 className='text-lg sm:text-2xl text-gray-600'> สถานที่รับยา</h1>
            <br />



            {/*We need Map feature here*/}        
            {/*We need Map feature here*/}    
            {/*We need Map feature here*/}
            {/* <h1 className='text-lg py-40'> insert map here </h1> */}
            <mapContext.Provider value={{selectedPillStore}}>
            <MapPage myPillStore={selectedPillStore} />
            </mapContext.Provider>
            {/* don't delete this line : just keep it for decoration when you put your map already: w-5/12 max-w-md h-full */}
            {/*We need Map feature here*/}    
            {/*We need Map feature here*/}   
            {/*We need Map feature here*/}   



            {render && 
                <SelectPillStore 
                    pharmacy={selectedPillStore.pharmacy}
                    location={selectedPillStore.location}
                /> 
            }

            {render && 
                <Button 
                title='เปลี่ยนสถานที่รับยา'
                className='mt-6 w-6/12 sm: max-w-xs'
                onClick={()=> history.push('/pillstore')}
                /> 
            }
        
            {render &&
                <Button 
                title='ดูรายการยา'
                className='mt-4 w-6/12 sm: max-w-xs'
                onClick={()=> history.push('/pill')}
                />
            }
  
        </div>
    )
}

export default HomePage
