import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom'
import Header from '../components/Header'
import FilterBarPill from './components/FilterBarPill'
import PillList from './components/PillList'
import UserContext from '../components/UserContext'


const PillPage = () => {

    const history = useHistory()
    const {user, pillList, setIsAuth} = useContext(UserContext);
    
    const [filter, setFilter] = useState("")    //filter string

    return (
        <div className='flex flex-col justify-start items-center w-screen h-full'>
            <Header 
                title='PILLPLUS+'
                className='py-8'
                name= {user.name}
                surname= {user.surname}
                onClick={() => {
                    setIsAuth(false)        //logout 
                    history.push('/login')
                }}
                onBackpage= {() => {
                    history.push('/home')
                }}
            />

            <h1 className='text-lg sm:text-2xl mb-2 text-gray-600'> รายการยา</h1>
            
            <PillList 
                pillList={pillList}
                filter={filter}
            />

        </div>
    )
}

export default PillPage
