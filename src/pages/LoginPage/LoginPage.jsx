import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom'; // May add Link in the future for footer ? or hospital link ? ... 
import Button from '../components/Button'
import UserContext from '../components/UserContext'

const LoginPage = () => {

    const history = useHistory()

    const [nationalId, setNationalId] = useState('6311148983216')    //Thai National ID 13 numbers   
    const [serialNumber, setSerialNumber] = useState('608d6dfd49214f8256c26efb')    //Bill Serial Numbers 

    const {user, setUser, setPillList, setSelectedPillStore, setCenter, setIsAuth, setPillStoreList, setRender, API_KEY, API_AUTH, API_PILLSTORES } = useContext(UserContext)

    const [error, setError] = useState(false) // default is false (* when error you need to setError for error to display on screen)

    const submitHandler = async (event) => {
        event.preventDefault();

        //For Debug
        //console.log({ identificationNumber: nationalId, _id: serialNumber });
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

                setIsAuth(true)
                history.push('/home')
                console.log(data)
                console.log("Login... Go to HomePage")

            } else {
                setError(true)
                console.log("ERROR:" + res.status)
                
                //history.push('/home') // THIS IS BY PASS
            }

        }
        fetchUser(nationalId, serialNumber) // set manually from mockup

        // get locations data
        const fetchLocations = async (prescriptionID) => {
            const res = await fetch(API_KEY + API_PILLSTORES + prescriptionID, {
                method: 'GET',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            if (res.status === 200){
                const data = await res.json()
                setPillStoreList(data)
                setRender(true)
                //console.log({PillStores : data})
            }else{
                console.log("ERROR:" + res.status + " Cannot get Avaliable pillStores")
            }

        }
        fetchLocations(user.prescriptionID)

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
                        placeholder="หมายเลขใบสั่งยา"
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
