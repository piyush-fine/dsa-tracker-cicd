import React from 'react'
import Template from '../components/Template'
// import loginImg from "../assets/login.png"
import loginImg from "../assets/login_bg.svg"

const Login = () => {
  return (
    <Template
      title="Welcome Back"
      image={loginImg}
      formtype="login"
    />
  )
}

export default Login
