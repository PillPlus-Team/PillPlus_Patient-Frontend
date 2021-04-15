
import Location from './Location'

const LocationList = ({locationList, filter, access}) => {
    
    const lowerCaseFilter = filter.toLowerCase()
    
    return (
        <>
            {locationList
                .filter( (location) => (
                    (
                        filter === "" || 
                        location.title.toLowerCase().includes(lowerCaseFilter) || 
                        location.description.toLowerCase().includes(lowerCaseFilter) 
                    )   
                    &&  
                    (
                        (location.status === access) || !access  //check box filter
                    )
                        
                ))

                .map( (location) => (
                    <Location 
                        key={location.id} 
                        location={location} 
                    />
                ))
            }
        </>
    )
}

export default LocationList
