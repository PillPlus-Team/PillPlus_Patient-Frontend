import { useState, useContext} from 'react';
import Button from '../components/Button'
import UserContext from '../components/UserContext'

const LoginPage = () => {

    const [nationalId, setNationalId] = useState('')    //Thai National ID 13 numbers   
    const [serialNumber, setSerialNumber] = useState('')    //Bill Serial Numbers 

    const {setUser, setPillList, setSelectedPillStore, setCenter, setIsAuth, setPillStoreList, setRender, API_KEY, API_AUTH, API_PILLSTORES} = useContext(UserContext)

    const [error, setError] = useState(false) // default is false (* when error you need to setError for error to display on screen)

    const submitHandler = async (event) => {
        event.preventDefault();

        //For Debug
        console.log({ identificationNumber: nationalId, _id: serialNumber });
        //console.log(API_KEY + API_AUTH)

        //get patient receipts user profile data 
        const fetchUser = async (nationalId, serialNumber) => {
            const res = await fetch(API_KEY + API_AUTH, {
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    identificationNumber: nationalId,
                    _id: serialNumber,
                }),
            });

            if (res.status === 200){
                const data = await res.json()
                setUser(data)
                setPillList(data.pills)
                setSelectedPillStore(data.pillStore)
                setCenter(data.pillStore.coordinate)

                console.log({receipt:data})
                
                // Store to LocalStorage for nationalId and serialNumber
                localStorage.setItem('nationalId', JSON.stringify(nationalId))
                localStorage.setItem('serialNumber', JSON.stringify(serialNumber))
                console.log("Stored to LocalStorage Completed")
                
                console.log("Fetch User Completed")
                return data.prescriptionID


            } else {
                setError(true)
                console.log("ERROR:" + res.status)
                
                //history.push('/home') // THIS IS BY PASS : PROCEED WITH CAUTION
            }

        }
        // get locations data
        const fetchLocations = async (prescriptionID) => {
            // console.log(API_KEY + API_PILLSTORES + prescriptionID)
            const res = await fetch(API_KEY + API_PILLSTORES + prescriptionID, {
                method: 'GET',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            if (res.status === 200){
                // console.log(res.status)
                // console.log('load LOCATIONS HERE')
                // console.log(prescriptionID)
                const data = await res.json()
                // console.log(data)
                setPillStoreList(data)
                console.log({PillStores : data})
                console.log({openingData : data.openingData})
                console.log("Fetch Location Completed")
                console.log('set auth true')
                setIsAuth(true)
            }else{
                setIsAuth(false)
                console.log("ERROR:" + res.status + " Cannot get Avaliable pillStores")
            }

        }
       
        fetchUser(nationalId, serialNumber)
        .then((prescriptionID) => fetchLocations(prescriptionID))
        .then(() => setRender(true))
        .then(() => {
            //history.push('/home')

            //Automatic Redirect to HomePage
            console.log("Going to HomePage, Welcome! :)")
        })

    }

    return (
        
        <div className="flex justify-center items-center w-screen h-screen">
            <div className="flex flex-col justify-center items-center w-11/12 py-8 sm:py-16 sm:max-w-lg  bg-white rounded-lg shadow-md">
                <form className="flex flex-col items-center w-9/12" onSubmit={submitHandler} autoComplete="off">
                    
                    <p className="text-3xl text-center mt-5 mb-2">ยินดีต้อนรับเข้าสู่ PILLPLUS+</p>

                    {error ?  // error display here  
                    <div className="flex flex-row flex-wrap justify-center h-11 sm:h-7 text-red-600" >
                        <h2> ไม่พบข้อมูลในระบบทะเบียน </h2>
                        <h2> กรุณาตรวจสอบอีกครั้ง </h2>
                    </div> : <div className="h-11 sm:h-7" ></div> }

                    {/* National ID  */}
                    <input
                        className="mt-1 self-stretch p-2 pl-4 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                        type="text"
                        value={nationalId}
                        onChange={(event) => {
                            setNationalId(event.target.value);
                        }}
                        placeholder="เลขบัตรประชาชน 13 หลัก"
                        required
                    />
                    {/* Serial Number  */}
                    <input
                        className="mt-4 self-stretch p-2 pl-4 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                        type="text"
                        value={serialNumber}
                        onChange={(event) => {
                            setSerialNumber(event.target.value);
                        }}
                        placeholder="หมายเลขใบเสร็จ"
                        required
                    />
                    
                    <Button
                        title='เข้าสู่ระบบ'
                        type='summit'
                        className='mt-6 self-stretch'
                        //onClick={() => history.push('/home')}  //bypass shortcut
                    />

                    
                </form>
            </div>
        </div>
    )
}

export default LoginPage
