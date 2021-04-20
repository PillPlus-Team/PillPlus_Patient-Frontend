import Location from './Location'

const LocationList = ({locationList, filter, access}) => {
    
    const lowerCaseFilter = filter.toLowerCase()

    const passRequirement = (location) => (
        (
            filter === "" || 
            location.title.toLowerCase().includes(lowerCaseFilter) || 
            location.description.toLowerCase().includes(lowerCaseFilter) 
        )   
        &&  
        (
            (location.status === access) || !access  //check box filter
        )
    )
    
    return (
        <>
            {locationList
                .filter( (location) => (
                    passRequirement(location)
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
