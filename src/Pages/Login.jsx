import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Login() {
    const [formData, setformData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate()
    const {email,password} = formData;
    function onchange(e) {
        setformData((prevState)=>({
            ...prevState,
            [e.target.id]: e.target.value
        }));
    }
    async function onSubmit(e){
        e.preventDefault();
        try {
            const auth = getAuth();
            const userCredential = await signInWithEmailAndPassword(auth,email,password);
            if (userCredential.user) {
                toast.success("Logged in")
                navigate("/profile");
            }
        } catch (error) {
            toast.error("Bad Credentials")
        }
    }
  return (
    <section className=' w-screen h-screen bg-grid p-16'>
        <div className='flex h-full w-full box-border items-center justify-center'>
            <div className='w-1/3 h-4/5 bg-[#23262d] rounded-lg'>
                <div>
                    <div className='text-white font-bold text-3xl p-5 text-center mt-3'>
                        <p>Login</p>
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
                        <div className='flex flex-col'>
                            <label htmlFor="email" className='text-white font-semibold text-xl'>Email</label>
                            <input type="email" id="email" className=' h-10 rounded-md outline-none focus:border-2 focus:border-orange-600' value={email} onChange={onchange}/>
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="password" className='text-white font-semibold text-xl'>Password</label>
                            <input type="password" id="password" className=' h-10 rounded-md outline-none focus:border-2 focus:border-orange-600' value={password} onChange={onchange}/>
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
