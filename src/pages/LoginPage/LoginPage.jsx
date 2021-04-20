import { useState } from 'react';
import { useHistory } from 'react-router-dom'; // May add Link in the future for footer ? or hospital link ? ... 
import Button from '../components/Button'

const LoginPage = () => {

    const history = useHistory()

    //Thai National ID 13 numbers
    const [username, setUsername] = useState('')    // use can change variable name if you want...
    //Bill Serial Numbers 
    const [password, setPassword] = useState('')

    const [error, setError] = useState(false) // default is false (* when error you need to setError for error to display on screen)


    const submitHandler = async (event) => {
        event.preventDefault();

        //For Debug
        console.log({ username, password });
        /*
            Logic here!
        */
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

                    <input
                        className="mt-1 self-stretch p-2 pl-4 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                        //id="input-username"
                        //name="username"
                        type="text"
                        value={username}

                        onChange={(event) => {
                            setUsername(event.target.value);
                        }}
                        placeholder="เลขบัตรประชาชน 13 หลัก"
                        required
                    />
                    <input
                        className="mt-4 self-stretch p-2 pl-4 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                        //id="input-password"
                        //name="password"
                        type="text"
                        value={password}
                        
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}
                        placeholder="หมายเลขใบสั่งยา"
                        required
                    />
                    
                    <Button
                        title='เข้าสู่ระบบ'
                        type='summit'
                        className='mt-6 self-stretch'
                        onClick={() => history.push('/home')}  //bypass shortcut
                    />

                    
                </form>
            </div>
        </div>
    )
}

export default LoginPage
