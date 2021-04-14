
import Location from './Location'

const LocationList = ({locationList, filter}) => {
    
    const lowerCaseFilter = filter.toLowerCase()
    
    return (
        <>
            {locationList
                .filter( (location) => (
                    filter == "" || 
                    location.title.toLowerCase().includes(lowerCaseFilter) || 
                    location.description.toLowerCase().includes(lowerCaseFilter)
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
