import { IoSearchSharp } from 'react-icons/io5'

const FilterBarPillStore = ({className, description, onChange, onCheck, value, access}) => {
    return (
        <div className={`${className} flex flex-row justify-center items-center bg-blue-600 rounded-xl rounded-b-none ring-2 ring-blue-500`}>
            <div className={`flex-grow flex flex-row rounded-xl rounded-bl-none ring-2 ring-gray-200 focus-within:ring-gray-300`}>
                <IoSearchSharp className='w-8 h-8 bg-gray-100 p-2 rounded-xl rounded-b-none rounded-r-none cursor-default'/>
                <input 
                    className='bg-white p-1 pl-2 rounded-xl rounded-l-none w-5 flex-grow focus:outline-none'                         
                    type="text"
                    //name="filter"
                    onChange={onChange}
                    placeholder={description}
                    value={value}
                />
            </div>
            
            <label 
                htmlFor="access" 
                className='ml-2 text-white'
            > 
                สถานที่รับยาได้
            </label>
            <input
                id="access"
                type="checkbox"
                className= 'h-5 w-5 mx-2'
                name='access'
                onChange={onCheck}
                checked={access}
            />
        </div>
    )
}

export default FilterBarPillStore
