import { useContext } from 'react';
import { useHistory } from 'react-router-dom'
import Header from '../components/Header'
import Button from '../components/Button'
import MapPage from '../MapPage/MapPage'
import SelectPillStore from './components/SelectPillStore'
import MapContext from '../components/MapContext';
import UserContext from '../components/UserContext'

const HomePage = () => {

    const history = useHistory()
    const {user, selectedPillStore, setIsAuth, center, setCenter, setIsSelect, pillStoreList} = useContext(UserContext);

    return (
        <div className='flex flex-col justify-start items-center w-screen h-screen'>
            <Header 
                title='PILLPLUS+'
                className='py-2 sm:py-4'
                name= {user.name}
                onClick={() => {
                    setIsAuth(false)
                    history.push('/login')
                }}
            />

            <h1 className='mb-3 text-gray-800 text-lg sm:text-2xl text-center'> 
                สถานที่รับยา
            </h1>
            
            <MapContext.Provider value={{selectedPillStore, center, setCenter, setIsSelect,pillStoreList}}>
                <MapPage />
                <SelectPillStore /> 
            </MapContext.Provider>
             
            <Button 
            title='เปลี่ยนสถานที่รับยา'
            className='my-2 mt-5 w-6/12 sm: max-w-xs '
            onClick={()=> history.push('/pillstore')}
            /> 
        
            <Button 
            title='ดูรายการยา'
            className='my-2 mb-4 w-6/12 sm: max-w-xs '
            onClick={()=> history.push('/pill')}
            />
  
        </div>
    )
}

export default HomePage
