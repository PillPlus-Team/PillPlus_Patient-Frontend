import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import Header from '../components/Header'
import Button from '../components/Button'
import { GrMap } from 'react-icons/gr'

const HomePage = () => {

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


            <h1 className='text-lg sm:text-2xl pb-4 text-gray-600'> สถานที่รับยา</h1>
            






            
            {/*We need Map feature here*/}
            <GrMap className='bg-white  w-5/12 max-w-max h-full'/>
           





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
