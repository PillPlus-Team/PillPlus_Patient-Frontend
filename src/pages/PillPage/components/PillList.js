import Pill from './Pill'

const PillList = ({pillList, filter}) => {
    
    const lowerCaseFilter = filter.toLowerCase()

    const passRequirement = (pill) => (
        (
            filter === "" || 
            pill.title.toLowerCase().includes(lowerCaseFilter) || 
            pill.description.toLowerCase().includes(lowerCaseFilter) ||
            pill.amount.toString().includes(lowerCaseFilter) || // not a string -> convert to string
            pill.unit.toLowerCase().includes(lowerCaseFilter) 
        )   
        
    )
    
    return (
        <>
            {pillList
                .filter( (pill) => (
                    passRequirement(pill)
                ))

                .map( (pill) => (
                    <Pill 
                        key={pill.id} 
                        pill={pill} 
                    />
                ))
 
            }
        </>
    )
}

export default PillList
