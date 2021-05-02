import Pill from './Pill'

const PillList = ({pillList}) => {
    
    return (
        <>
            {
                pillList.map( (pill, index) => {
                    
                    //Debug
                    // console.log(pill.sn)       
                    return  <Pill 
                        index={index}
                        key={pill.sn} 
                        pill={pill} 
                    />
                })
            }
        </>
    )
}

export default PillList
