import { IoSearchSharp } from 'react-icons/io5'

const FilterBar = ({className, description}) => {
    return (
        <div className={`${className} flex flex-row rounded-xl ring-2 ring-gray-200 focus-within:ring-gray-400`}>
            <IoSearchSharp className='w-8 h-8 bg-gray-100 p-2 rounded-xl rounded-r-none cursor-default'/>
            <input 
                className='bg-white p-1 pl-2 rounded-xl rounded-l-none flex-grow focus:outline-none'                         
                type="text"
                //name="filter"
                onChange={(event) => {
                    //setUsername(event.target.value);
                }}
                placeholder={description}
                //value={username}
            />
        </div>
    )
}

export default FilterBar
