import Button from '../../components/Button'

const Location = ({location}) => {
    return (
        <div className='flex flex-row flex-wrap justify-center items-center bg-white p-5 m-5 w-16/12 h-auto'>
            <div className='flex flex-col mx-5'>
                <h2 className='text-xl'>{location.title}</h2>
                <h3 className='text-gray-400'>{location.description}</h3>
            </div>
            
            <div>
                <h3 className={
                        `${location.status ?'bg-green-100 text-green-500':'bg-red-200 text-red-500'} 
                            mx-5 min-w-max p-3 w-40 text-center`}
                > 
                    {location.status ?'สามารถไปรับยาได้':'ไม่สามารถไปรับยาได้'}
                </h3>
            </div>
            
            <Button title='map'/>
            
        </div>
    )
}

export default Location
