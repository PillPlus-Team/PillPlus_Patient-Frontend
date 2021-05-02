import ButtonHeader from '../components/ButtonHeader'
import { FaChevronLeft } from 'react-icons/fa'
import { useLocation } from 'react-router-dom'

const Header = ({title, className, onClick, onBackpage}) => {

    const location = useLocation()
    const isHomePath = location.pathname === '/home'

    return (
        <nav className="flex flex-col justify-start items-center w-full" >
            <div className={`flex flex-row ${isHomePath? "justify-end":"justify-between"} items-center w-full bg-blue-600 p-1 fixed z-50`}>

                {!isHomePath && 
                    <ButtonHeader 
                        title= { 
                            <div className="flex flex-row justify-center items-center "> 
                                <FaChevronLeft/> 
                                <h1 className='mx-2 hidden sm:inline-block' > ย้อนกลับ </h1>
                            </div>
                        }
                        onClick= {onBackpage}
                        className= 'mr-0 sm:mr-2 lg:mr-4'
                    />
                }
                
                <ButtonHeader 
                    title= 'ออกจากระบบ'
                    onClick= {onClick}
                    className= 'mr-0 sm:mr-2 lg:mr-4'
                />
            </div>



            <h1 className={`${className} mt-14 self-center text-4xl sm:text-5xl font-bold text-white filter drop-shadow-md`}>{title}</h1>
        </nav>
    )
}

export default Header
