import React from 'react'
import { useState } from 'react'
import {db} from '../Firebase'
import {getAuth ,createUserWithEmailAndPassword ,updateProfile} from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import { serverTimestamp ,setDoc, doc } from 'firebase/firestore';
import {toast} from 'react-toastify'

export default function SignUp() {
    const [formData,setformData] = useState({
        First: '',
        Last: '',
        email: '',
        password: '',
        number: ''
    });
    const navigate = useNavigate();
    const {First,Last,email,password,number} = formData;
    function onchange(e){
        setformData((prevState)=>({
            ...prevState,
            [e.target.id]: e.target.value
        }));
    }

    async function onSubmit(e){
        e.preventDefault();
        try {
            const auth = getAuth();
            const userCredentials = await createUserWithEmailAndPassword(auth,email,password);
            updateProfile(auth.currentUser,{
              First: First,
              Last: Last
            });
            const user = userCredentials.user;
            const formDataCopy = {...formData};
            delete formDataCopy.password;
            formDataCopy.timestamp = serverTimestamp();
            await setDoc(doc(db,"users",user.uid),formDataCopy);
            toast.success("Sign Up was successful");
            navigate("/login");
          } catch (error) {
            console.log(error);
            toast.error("Something went wrong with the registration");
          }
    }
  return (
    <section className=' w-screen h-screen bg-grid p-16'>
        <div className='flex h-full w-full box-border items-center justify-center'>
            <div className='w-1/3 h-4/5 bg-[#23262d] rounded-lg'>
                <div>
                    <div className='text-white font-bold text-3xl p-5 text-center mt-3'>
                        <p>Sign Up</p>
                    </div>
                    <form className='mt-10 px-5' onSubmit={onSubmit}>
                        {/* <div className=''>
                            <input type="text" className='h-12 w-full rounded-lg px-5 focus:border-black focus:border-2 ' placeholder='Enter Your Email...' />
                        </div>
                        <div className='mt-10'>
                            <input type="text" className='h-12 w-full rounded-lg px-5' placeholder='Enter Your Password...' />
                        </div>
                        <div className='mt-10 box-border'>
                            <button type="submit" className=' bg-orange-600 text-white capitalize w-full py-3 font-bold text-xl rounded-lg hover:border-2 hover:border-orange-600 hover:bg-transparent'>submit</button>
                        </div> */}
                        <div className='flex justify-between text-lg font-semibold space-x-4'>
                            <div className='flex flex-col'>
                                <label htmlFor="First" className='text-white'>First Name</label>
                                <input type="First" id="First" className=' w-11/12 h-10 rounded-md outline-none focus:border-2 focus:border-orange-600' value={First} onChange={onchange}/>
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="Last" className='text-white'>Last Name</label>
                                <input type="Last" id="Last"  className=' w-11/12 h-10 rounded-md outline-none focus:border-2 focus:border-orange-600' value={Last} onChange={onchange} />
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="email" className='text-white font-semibold text-xl'>Email</label>
                            <input type="email" id="email" className=' h-10 rounded-md outline-none focus:border-2 focus:border-orange-600' value={email} onChange={onchange}/>
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="password" className='text-white font-semibold text-xl'>Password</label>
                            <input type="password" id="password" className=' h-10 rounded-md outline-none focus:border-2 focus:border-orange-600' value={password} onChange={onchange}/>
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="number" className='text-white font-semibold text-xl'>Mobile Number</label>
                            <input type="number" id="number" className=' h-10 rounded-md outline-none focus:border-2 focus:border-orange-600' value={number} onChange={onchange}/>
                        </div>
                        <div className='mt-10'>
                            <button type='submit' className='w-full py-2 bg-orange-600 text-white font-semibold text-lg font-serif hover:bg-transparent hover:border-2 hover:border-orange-600 rounded-md'>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
  )
}
