import React from 'react'
// import signupImg from "../assets/signup.png"
import signupImg from "../assets/signup_bg.svg"
import Template from '../components/Template'

const SignUp = () => {
  return (
    <Template
      title="Create an account"
      image={signupImg}
      formtype="signup"
    />
  )
}

export default SignUp
