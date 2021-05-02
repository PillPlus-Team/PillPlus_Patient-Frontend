const Pill = ({pill, index}) => {
    return (
        <div 
            className='flex flex-row w-full h-full py-2'
        >
            {/* left */}
            <h1 className='mr-1'>{index+1}.</h1>
            {/* right */}
            <div className='flex flex-col w-full h-full'>
                <h1>{pill.name}</h1>
                <h1 className='text-sm text-gray-400 '>
                    {pill.description.split('\n').map((subString) => {
                        return (
                            <>
                                {subString}
                                <br />
                            </>
                        );
                    })}
                </h1>
                <div className='flex flex-row w-full h-full justify-between'>
                    <h1>{pill.amount + " "}{pill.unit}</h1>
                    <h1>
                        {Number(pill.totalPrice).toLocaleString('th-TH', {
                                                    style: 'currency',
                                                    currency: 'THB',
                                                    minimumFractionDigits: 2,
                                                })}
                    </h1>
                </div>
                
            </div>

            
            
        </div>
    )
}

export default Pill
