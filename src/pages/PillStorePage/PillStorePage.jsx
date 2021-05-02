import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom'
import Header from '../components/Header'
import Button from '../components/Button'
import MapPage from '../MapPage/MapPage';
import PillStoreList from './components/PillStoreList'
import FilterBarPillStore from './components/FilterBarPillStore'
import MapContext from '../components/MapContext'
import UserContext from '../components/UserContext'

const PillStorePage = () => {

    const history = useHistory() 
    const {user, selectedPillStore, setSelectedPillStore, setIsAuth, center, setCenter, isSelect, setIsSelect, API_KEY, API_PILLSTORES,pillStoreList, setPillStoreList, render} = useContext(UserContext);

    //for fetch locations
    
     // check if list already load and display bottom part (2 buttons) 
                                                // don't make it load before locations
    //get all pillStores locations 
    
    const [filter, setFilter] = useState("")    //filter string
    const [access, setAccess] = useState(true) //checkbox

    //************** FOR ALL LOCATIONS END **************

    return (
        <div className='flex flex-col justify-start items-center w-screen h-screen'>
            <Header 
                title='PILLPLUS+'
                className='py-2 sm:py-4'
                name= {user.name}
                onClick={() => {
                    setIsAuth(false)        //logout 
                    history.push('/login')  
                }}
                onBackpage= {() => {
                    history.push('/home')
                }}
            />
            <h1 className='mb-3 text-gray-900 text-lg sm:text-2xl inline-block sm:hidden'>เปลี่ยนสถานที่รับยา</h1>
            
            <div className='flex flex-col xl:flex-row justify-start items-center xl:items-start w-full h-full'>


                    <MapContext.Provider value={{selectedPillStore, setCenter, center, setIsSelect, setSelectedPillStore, access, pillStoreList}}>
                        <MapPage />
                    </MapContext.Provider>
    
  
                {/* large filter and pillStoreList and done button */} 
                <div className='flex flex-col justify-start items-center w-10/12 sm:p-5 mt-2 sm:mt-0 sm:h-full '> 

                    <h1 className='my-2 text-gray-800 text-lg sm:text-2xl hidden sm:inline-block'>เปลี่ยนสถานที่รับยา</h1>
                    
                    {render &&
                        <FilterBarPillStore 
                            className = 'mt-1 sm:mt-0 my-0.5 w-995/1000 z-40'
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
                    }
                    
                    <MapContext.Provider value={{setIsSelect,setSelectedPillStore,setCenter,center}}>
                        <div className="flex flex-col justify-start items-center overflow-y-auto h-full w-full max-h-44 sm:max-h-128 divide-y border-l-0 border-r-0 bg-gray-200 z-30 ">
                            <PillStoreList 
                                pillStoreList={pillStoreList}
                                filter={filter} //filter string
                                access={access} //checkbox
                            />
                        </div>
                    </MapContext.Provider>
                
                    {render &&
                        <Button 
                            title='ยืนยัน'
                            className={`rounded-t-none rounded-sm  w-full h-11 disabled:opacity-50 ${!isSelect ? "pointer-events-none":" " }`}
                            onClick={()=> history.push('/home')}
                            disabled={!isSelect} // make it true for default (disable = true at first time)
                        />
                    }

                </div>
            </div>
        </div>
    )
}

export default PillStorePage
