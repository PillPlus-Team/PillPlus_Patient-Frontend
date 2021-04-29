const Pill = ({pill}) => {
    return (
        <button 
            className='flex flex-col sm:flex-row items-center justify-between bg-white hover:bg-gray-100 focus:outline-none p-5 m-1 w-10/12 sm:max-w-screen-sm h-auto  rounded-lg ring-2 ring-gray-300 '
        >
            
            <h1 className='text-xl '>{pill.name}</h1>
            <h1 className='text-gray-400 line-clamp-3 sm:line-clamp-2 '>{pill.description}</h1>
            <h1 className='text-xl '>{pill.amount + " "}{pill.unit}</h1>
            
            
        </button>
    )
}

export default Pill
