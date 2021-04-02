import { useState } from 'react';
import { Link } from 'react-router-dom'; // May add Link in the future for footer ? or hospital link ? ... 
import Button from '../components/Button'

const LoginPage = () => {
    //Thai National ID 13 numbers
    const [username, setUsername] = useState('')
    //Bill Serial Numbers 
    const [password, setPassword] = useState('')

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
                    
                    <p className="text-3xl text-center">ยินดีต้อนรับเข้าสู่ PILLPLUS+</p>

                    <input
                        className="mt-6 self-stretch p-2 pl-4 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                        id="input-username"
                        name="username"
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
                        id="input-password"
                        name="password"
                        type="password"
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
                    />
                        
                </form>
            </div>
        </div>
    )
}

export default LoginPage
