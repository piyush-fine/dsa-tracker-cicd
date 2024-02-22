import "./App.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Auth } from "./pages/Auth";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import OpenRoute from "./components/core/Auth/OpenRoute";

import UpdatePassword from "./pages/UpdatePassword";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyEmail from "./pages/VerifyEmail";
import { Landing } from "./pages/Landing";
import {Questions} from "./pages/Questions";
import { Configuration } from "./pages/Configuration";




function App() {
   

  return (
    <div className="min-h-screen max-w-screen overflow-x-hidden">
      {/* <Header/> */}
      <Routes>

        <Route path="/" element={<Auth/>} />
        <Route
            path="signUp"
            element={
              <OpenRoute>
                <SignUp />
              </OpenRoute>
            }
          />
        <Route
            path="login"
            element={
              <OpenRoute>
                <Login />
              </OpenRoute>
            }
          />

        <Route
            path="forgot-password"
            element={
              <OpenRoute>
                <ForgotPassword />
              </OpenRoute>
            }
          />  

        <Route
            path="verify-email"
            element={
              <OpenRoute>
                <VerifyEmail />
              </OpenRoute>
            }
          />  

        <Route
            path="update-password/:id"
            element={
              <OpenRoute>
                <UpdatePassword />
              </OpenRoute>
            }
          />

        <Route path="landing" element={<Landing />} />

        <Route path="questions/:topicName/:topicID" element={<Questions />} />

        <Route path="config" element={<Configuration/>}></Route>
      </Routes>

      
      {/* <Footer/> */}
    </div>
  );
}

export default App;
