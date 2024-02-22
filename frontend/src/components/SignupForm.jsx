import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import {toast} from "react-hot-toast"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { sendOtp } from "../services/operations/authAPI"
import { setSignupData } from "../slices/authSlice"


const SignupForm = ({setIsLoggedIn}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [formData, setFormData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:""
    })

    // const [showPassword, setShowPassword] = useState(false);
    // const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    // const [accountType, setAccountType] = useState("student");

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const [accountType, setAccountType] = useState("Student")

    const { firstName, lastName, email, password, confirmPassword } = formData

    function changeHandler(event) {

        setFormData( (prevData) =>(
            {
                ...prevData,
                [event.target.name]:event.target.value
            }
        ) )

    }

    function submitHandler(e) {
        e.preventDefault()
      
          if (password !== confirmPassword) {
            toast.error("Passwords Do Not Match")
            return
          }
          const signupData = {
            ...formData,
            accountType,
          }
      
          // Setting signup data to state
          // To be used after otp verification
          dispatch(setSignupData(signupData))
          // Send OTP to user for verification
          dispatch(sendOtp(formData.email, navigate))
      
          // Reset
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
          })
          setAccountType("Student")
    }


  return (
    <div>

        <form onSubmit={submitHandler} >
        {/* first name and lastName */}
            <div className='flex gap-x-4 mt-[20px]'>
                    <label className='w-full'>
                        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>First Name<sup className='text-red-500'>*</sup></p>
                        <input
                            required
                            type="text"
                            name="firstName"
                            onChange={changeHandler}
                            placeholder="Enter First Name"
                            value={formData.firstName}
                            className='bg-richblack-800 border-orange-500 border rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                        />
                    </label>

                    <label className='w-full'>
                        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Last Name<sup className='text-red-500'>*</sup></p>
                        <input
                            required
                            type="text"
                            name="lastName"
                            onChange={changeHandler}
                            placeholder="Enter Last Name"
                            value={formData.lastName}
                            className='bg-richblack-800 border-orange-500 border rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                        />
                    </label>
            </div>
            {/* email Add */}
            <div className='mt-[20px]'>
            <label className='w-full mt-[20px]'>
                    <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Email Address<sup className='text-red-500'>*</sup></p>
                    <input
                        required
                        type="email"
                        name="email"
                        onChange={changeHandler}
                        placeholder="Enter Email Address "
                        value={formData.email}
                        className='bg-richblack-800 border-orange-500 border rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                    />
            </label>
            </div>
            

            {/* createPassword and Confirm Password */}
            <div className='w-full flex gap-x-4 mt-[20px]'>
                <label className='w-full relative'>
                    <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Create Password<sup className='text-red-500'>*</sup></p>
                    <input
                        required
                        type= {showPassword ? ("text") : ("password")}
                        name="password"
                        onChange={changeHandler}
                        placeholder="Enter Password"
                        value={formData.password}
                        className='bg-richblack-800 border-orange-500 border rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                    />
                    <span
                     className='absolute right-3 top-[38px] cursor-pointer' 
                    onClick={() => setShowPassword((prev) => !prev)}>
                        {showPassword ? 

                        (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : 

                        (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}
                    </span>
                </label>

                <label className='w-full relative'>
                    <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Confirm Password<sup className='text-red-500'>*</sup></p>
                    <input
                        required
                        type= {showConfirmPassword ? ("text") : ("password")}
                        name="confirmPassword"
                        onChange={changeHandler}
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        className='bg-richblack-800 border-orange-500 border rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                    />
                    <span 
                     className='absolute right-3 top-[38px] cursor-pointer'
                    onClick={() => setShowConfirmPassword((prev) => !prev)}>
                        {showConfirmPassword ?

                         (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : 

                         (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}
                    </span>
                </label>
            </div>
        <button className=' w-full bg-black rounded-[8px] font-medium text-richblack-900 px-[12px] py-[10px] mt-6 text-orange-400 hover:border-orange-900 hover:border-2 hover:bg-white hover:text-black'>
            Create Account
        </button>
        </form>

    </div>
  )
}

export default SignupForm
