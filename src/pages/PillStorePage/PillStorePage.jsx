import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import Header from '../components/Header'
import Button from '../components/Button'
import MapPage from '../MapPage/MapPage';
import PillStoreList from './components/PillStoreList'
import FilterBarPillStore from './components/FilterBarPillStore'
import MapContext from '../components/MapContext'

const PillStorePage = () => {

    //************** FOR PATIENT USER START **************
    const history = useHistory()
    const [profile, setProfile] = useState({})      // the login selected one (only 1) 
    const [selectedPillStore, setSelectedPillStore] = useState({})
    
    const [isAuth, setIsAuth] = useState(true)  // Authentication mockup

    //get patient user profile data 
    useEffect(() => {
        const fetchProfile = async (id) => {
            const res = await fetch(`http://localhost:5500/receipts/${id}`)
            const data = await res.json()

            setProfile(data)
            setSelectedPillStore(data.pillStore)
        }

        fetchProfile("1101402227500") // set manually from mockup
    },[])   

    //************** FOR PATIENT USER END **************

    //************** FOR ALL LOCATIONS START **************
    const [pillStoreList, setPillStoreList] = useState([])
    const [render, setRender] = useState(false) // check if list already load and display bottom part (2 buttons) 
                                                // don't make it load before locations
  
    useEffect(() => {
        const fetchLocations = async () => {
            const res = await fetch('http://localhost:5500/pillStores')
            const data = await res.json()
  
            setPillStoreList(data)
            setRender(true)
        }
  
        fetchLocations()
    },[])

    const [filter, setFilter] = useState("")    //filter string
    const [access, setAccess] = useState(true) //checkbox
    const [select, setSelect] = useState(false)

    //************** FOR ALL LOCATIONS END **************
    

    return (
        <div className='flex flex-col justify-start items-center w-full h-full'>
            <Header 
                title='PILLPLUS+'
                className='py-2 sm:py-4'
                name= {profile.name}
                onClick={() => {
                    setIsAuth(false)        //logout 
                    history.push('/login')  
                }}
                onBackpage= {() => {
                    history.push('/home')
                }}
            />
            
            <div className='flex flex-col xl:flex-row justify-center items-center xl:items-start w-full'>

                <div className='my-2  xl:ml-14 flex flex-col justify-center items-center'>
                    
                    <MapContext.Provider value={{selectedPillStore}}>
                        <MapPage />
                    </MapContext.Provider>
                </div>

                <div className='flex flex-col justify-start items-center w-full '>
                <h1 className='mb-3 text-gray-800 text-lg  sm:text-2xl'>เปลี่ยนสถานที่รับยา</h1>
                    <FilterBarPillStore 
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
                    
                    <MapContext.Provider value={{setSelect,setSelectedPillStore}}>
                        <PillStoreList 
                            pillStoreList={pillStoreList}
                            filter={filter} //filter string
                            access={access} //checkbox
                        />
                    </MapContext.Provider>
                
                    {render &&
                        <Button 
                            title='ยืนยัน'
                            className={`mt-2 w-32 sm:w-48 h-11 mx-2 sm:mx-3 disabled:opacity-50 {!select ? "pointer-events-none":" " }`}
                            onClick={()=> history.push('/home')}
                            disabled={!select} // make it true for default (disable = true at first time)
                        />
                    }

                </div>
            </div>
        </div>
    )
}

export default PillStorePage
