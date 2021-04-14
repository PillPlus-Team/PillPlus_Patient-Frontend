import Button from './Button'

const Header = ({name, surname, title, className, onClick}) => {
    return (
        <div className="flex flex-col w-screen h-auto" >
            <div className="flex flex-row justify-between sm:justify-end bg-blue-500 p-1 ">
                <h1 className='p-2 bg-blue-500 text-white rounded-lg mr-0 sm:mr-2 lg:mr-4'>
                    คุณ {name} {surname}
                </h1>
                <Button 
                    title= 'ออกจากระบบ'
                    onClick= {onClick}
                    className= 'mr-0 sm:mr-2 lg:mr-4'
                />
            </div>
            <h1 className={`${className} self-center text-4xl sm:text-5xl font-bold text-blue-500`}>{title}</h1>
        </div>
    )
}

export default Header
