import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import Header from '../components/Header'
import Button from '../components/Button'

const HomePage = () => {

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

    return (
        <div className='flex flex-col justify-start items-center w-screen h-screen'>
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


            <h1 className='text-lg sm:text-2xl pb-4 text-gray-600'> สถานที่รับยา</h1>
            
            {/*We need Map feature here*/}
            <img className='w-9/12 sm:max-w-screen-md' src="https://miro.medium.com/max/4064/1*qYUvh-EtES8dtgKiBRiLsA.png" alt="map feature"/>
           
            <Button 
                title='เปลี่ยนสถานที่'
                className='mt-6 w-6/12 sm: max-w-xs'
                onClick={()=> history.push('/location')}
            />
            <Button 
                title='ดูรายการยา'
                className='mt-4 w-6/12 sm: max-w-xs'
                onClick={()=> history.push('/druglist')}
            />
  
        </div>
    )
}

export default HomePage
