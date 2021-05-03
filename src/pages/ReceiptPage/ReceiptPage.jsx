import { useContext } from 'react';
import { useHistory } from 'react-router-dom'
import Header from '../components/Header'
import PillList from './components/PillList'
import UserContext from '../components/UserContext'


const ReceiptPage = () => {

    const history = useHistory()
    const {user, selectedPillStore, pillList, render, logout} = useContext(UserContext);

    return (
        <div className='flex flex-col justify-start items-center w-screen h-screen'>
            <Header 
                title='PILLPLUS+'
                className='py-2 sm:py-4'
                onClick={() => {
                    logout()
                }}
                onBackpage= {() => {
                    history.push('/home')
                }}
            />

            <h1 className='text-lg sm:text-2xl mb-2 text-gray-900'> ใบเสร็จออนไลน์ </h1>
            
            {render && 
              
            <div className='flex flex-col divide-y w-11/12 sm:w-160 h-160 mb-4 bg-white rounded-lg filter drop-shadow-xl p-3 overflow-y-auto'>
                {/* row 1 */}
                <div className='flex flex-row items-center w-full h-full'>
                    <h1 className='flex-left sm:flex-left2 font-bold'> รหัสใบเสร็จ </h1>
                    <h1 className='flex-right'> {user._id} </h1>
                </div>
                {/* row 2 */}
                <div className='flex flex-row items-center w-full h-full'>
                    <h1 className='flex-left sm:flex-left2 font-bold'> รหัส HN </h1>
                    <h1 className='flex-right'> {user.hn} </h1>
                </div>
                {/* row 3 */}
                <div className='flex flex-row items-center w-full h-full'>
                    <h1 className='flex-left sm:flex-left2 font-bold'> ชื่อ </h1>
                    <h1 className='flex-right'> {user.name} </h1>
                </div>
                {/* row 4 */}
                <div className='flex flex-row items-center w-full h-full'>
                    <h1 className='flex-left sm:flex-left2 font-bold'> เลขบัตรประชาชน </h1>
                    <h1 className='flex-right'> {user.identificationNumber} </h1>
                </div>
                {/* row 5 */}
                <div className='flex flex-row items-center w-full h-full'>
                    <h1 className='flex-left sm:flex-left2 font-bold'> แพทย์ผู้ตรวจ </h1>
                    <h1 className='flex-right'> {user.doctor} </h1>
                </div>
                {/* row 6 */}
                <div className='flex flex-row items-center w-full h-full'>
                    <h1 className='flex-left sm:flex-left2 font-bold self-start pt-2'> สถานที่รับยา </h1>
                    <div className='flex-right w-full h-full flex flex-col justify-center my-2'> 
                        <h1 className=''>{selectedPillStore.pharmacy}</h1>
                        <h1 className='text-sm text-gray-400'>{selectedPillStore.location}</h1>
                    </div>
                </div>
                {/* row 7 */}
                <div className='flex flex-row items-center w-full h-full'>
                    <h1 className='flex-left sm:flex-left2 font-bold self-start pt-2'> รายการยาที่ได้รับ </h1>
                    <div className='divide-y flex-right w-full h-full flex flex-col justify-start'> 
                        <PillList pillList={pillList}/>
                    </div>
                </div>
                {/* row 8 */}
                <div className='flex flex-row items-center w-full h-full'>
                    <h1 className='flex-left sm:flex-left2 font-bold'> ค่าบริการ </h1>
                    <h1 className='flex-right text-right'>
                    {Number(user.serviceCharge).toLocaleString('th-TH', {
                                                    style: 'currency',
                                                    currency: 'THB',
                                                    minimumFractionDigits: 2,
                                                })}
                    </h1>
                </div>
                {/* row 9 */}
                <div className='flex flex-row items-center w-full h-full'>
                    <h1 className='flex-left sm:flex-left2 font-bold'> รวมทั้งสิ้น </h1>
                    
                    <h1 className='flex-right text-right'> 
                    {Number(user.totalPay).toLocaleString('th-TH', {
                                                    style: 'currency',
                                                    currency: 'THB',
                                                    minimumFractionDigits: 2,
                    })}
                    </h1>
                </div>

            </div>

            }


            {/* <PillList 
                pillList={pillList}
                filter={filter}
            /> */}

        </div>
    )
}

export default ReceiptPage
