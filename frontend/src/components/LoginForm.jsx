import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';

import { login } from "../services/operations/authAPI"


const LoginForm = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [formData, setFormData] = useState( {
        email:"", password:""
    })

    const { email, password } = formData

    const [showPassword, setShowPassword] = useState(false)

    function changeHandler(event) {

      setFormData( (prevData) =>(
          {
              ...prevData,
              [event.target.name]:event.target.value
          }
      ) )

    }

    function submitHandler(event) {
        event.preventDefault()
        dispatch(login(email, password, navigate))
        // navigate("/landing")
    }

  return (
    <form
      onSubmit={submitHandler}
      className="mt-6 flex w-full flex-col gap-y-4"
    >
      <label className="w-full">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
          Email Address <sup className="text-red-500">*</sup>
        </p>
        <input
          required
          type="text"
          name="email"
          value={email}
          onChange={changeHandler}
          placeholder="Enter email address"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] border-orange-500 border bg-richblack-800 p-[12px] text-richblack-5"
        />
      </label>
      <label className="relative">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
          Password <sup className="text-red-500">*</sup>
        </p>
        <input
          required
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={changeHandler}
          placeholder="Enter Password"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-800 border-orange-500 border p-[12px] pr-12 text-richblack-5"
        />
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-[38px] z-[10] cursor-pointer"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
          ) : (
            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
          )}
        </span>
        <Link to="/forgot-password">
          <p className="mt-1 ml-auto max-w-max text-xs text-blue-500 hover:text-black">
            Forgot Password
          </p>
        </Link>
      </label>
      <button
        type="submit"
        className="mt-6 rounded-[8px] bg-black py-[10px] px-[12px] font-medium text-richblack-900 text-orange-400 hover:border-orange-900 hover:border-2 hover:bg-white hover:text-black"
      >
        Sign In
      </button>
    </form>
  )
}

export default LoginForm
