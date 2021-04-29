import { IoSearchSharp } from 'react-icons/io5'

const FilterBarPill = ({className, description, onChange, value}) => {
    return (
        <div className={`${className} flex flex-row justify-center items-center h-full bg-blue-500 rounded-xl ring-2 ring-blue-500`}>
            <div className={`flex-grow flex flex-row rounded-xl ring-2 ring-gray-200 focus-within:ring-gray-400`}>
                <IoSearchSharp className='w-8 h-8 bg-gray-100 p-2 rounded-xl rounded-r-none cursor-default'/>
                <input 
                    className='bg-white p-1 pl-2 rounded-xl rounded-l-none w-5 flex-grow focus:outline-none'                         
                    type="text"
                    //name="filter"
                    onChange={onChange}
                    placeholder={description}
                    value={value}
                />
            </div>
        </div>
    )
}

export default FilterBarPill
