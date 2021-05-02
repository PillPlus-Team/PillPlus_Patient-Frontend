import Pill from './Pill'

const PillList = ({pillList}) => {
    
    return (
        <>
            {pillList
                .map( (pill, index) => (
                    <Pill key={pill.sn} pill={pill} index={index} />
                ))
            }
        </>
    )
}

export default PillList
