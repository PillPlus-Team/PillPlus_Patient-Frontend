import ButtonHeader from '../components/ButtonHeader'
import { FaChevronLeft } from 'react-icons/fa'
import { useLocation } from 'react-router-dom'

const Header = ({name, title, className, onClick, onBackpage}) => {

    const location = useLocation()
    const isHomePath = location.pathname === '/home'

    return (
        <nav className="flex flex-col justify-start items-center w-full" >

            <div className={`flex flex-row ${isHomePath? "justify-end":"justify-between"} items-center w-full bg-blue-500 p-1 fixed z-10`}>

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
                
                <div className="flex flex-row justify-end items-center ">
                    <h1 className='px-0 sm:px-2 bg-blue-500 text-white rounded-lg mr-0 sm:mr-2 lg:mr-4'>
                        {name}
                    </h1>
                    <ButtonHeader 
                        title= 'ออกจากระบบ'
                        onClick= {onClick}
                        className= 'mr-0 sm:mr-2 lg:mr-4'
                    />
                </div>

            </div>



            <h1 className={`${className} mt-14 self-center text-4xl sm:text-5xl font-bold text-blue-500`}>{title}</h1>
        </nav>
    )
}

export default Header
