import Button from '../../components/Button'

const Location = ({location}) => {
    return (
        <div className='flex flex-row flex-wrap items-center justify-center bg-white p-5 m-1 w-10/12 sm:max-w-screen-sm h-auto  rounded-lg ring-2 ring-gray-300'>
            <div className='flex flex-col w-80 mx-2 flex-grow'>
                <h2 className='text-xl'>{location.title}</h2>
                <h3 className='text-gray-400 line-clamp-3 sm:line-clamp-2'>{location.description}</h3>
            </div>
            
            
            <h3 className={
                    `${location.status ?'bg-green-100 text-green-500':'bg-red-200 text-red-500'} 
                        p-3 mx-2 mt-3 md:mt-0 w-40 text-center flex-grow`}
            > 
                {location.status ?'สามารถไปรับยาได้':'ไม่สามารถไปรับยาได้'}
            </h3>
            
            
            <Button 
                title='map'
                className='p-3 mx-2  mt-3 md:mt-0 px-5 flex-grow'
            />
            
        </div>
    )
}

export default Location
