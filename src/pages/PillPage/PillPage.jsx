import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import Header from '../components/Header'
import FilterBarPill from './components/FilterBarPill'
import PillList from './components/PillList'



const PillPage = () => {

    //************** FOR PATIENT USER START **************
    const history = useHistory()
    const [profile, setProfile] = useState({})      // the login selected one (only 1) 
    
    const [isAuth, setIsAuth] = useState(true)  // Authentication mockup
    

    const [pillList, setPillList] = useState([])

    //get patient user profile data 
    useEffect(() => {
        const fetchProfile = async (id) => {
            const res = await fetch(`http://localhost:5000/receipts/${id}`)
            const data = await res.json()

            setProfile(data)
            setPillList(data.pills)
        }

        fetchProfile("1101402227500") // set manually from mockup

    },[])   

    //************** FOR PATIENT USER END **************

    const [filter, setFilter] = useState("")    //filter string

    return (
        <div className='flex flex-col justify-start items-center w-screen h-full'>
            <Header 
                title='PILLPLUS+'
                className='py-8'
                name= {profile.name}
                surname= {profile.surname}
                onClick={() => {
                    setIsAuth(false)        //logout 
                    history.push('/login')
                }}
                onBackpage= {() => {
                    history.push('/home')
                }}
            />

            <h1 className='text-lg sm:text-2xl mb-2 text-gray-600'> รายการยา</h1>
            
            <FilterBarPill 
                className = 'my-2 w-10/12 sm:max-w-screen-sm h-full '
                description = 'ค้นหา...' // ชื่อร้าน, ที่อยู่
                onChange={(event) => {
                    setFilter(event.target.value) //change filter string
                }}
                value={filter}  //filter string
            />

            <PillList 
                pillList={pillList}
                filter={filter}
            />

        </div>
    )
}

export default PillPage
