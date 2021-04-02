
import Location from './Location'

const LocationList = ({locationList,}) => {
    return (
        <>
            {locationList.map((location) => (
                <Location 
                    key={location.id} 
                    location={location} 
                />
            ))}
        </>
    )
}

export default LocationList
