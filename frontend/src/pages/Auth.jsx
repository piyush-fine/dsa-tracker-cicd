import React from 'react'
import question_image from "../assets/questions_background.svg"
import topic_image from "../assets/topicwise_background.svg"
import tracker_image from "../assets/percentage_background.svg"
import {FaArrowRightLong} from "react-icons/fa6"
import { useNavigate } from 'react-router-dom'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux/es/hooks/useSelector'


export const Auth = () => {
  const navigate = useNavigate();
  return (
    <div className=''>
      <Header/>
        <div className=' flex flex-col items-center justify-center bg-[#001e2b] rounded-b-[70px] py-[18rem] gap-5'> 
          <div className='text-[5rem] mx-auto w-[70%] text-center text-white'>
            <span className='text-orange-400'>DSALog.</span> DSA Mastery Unveiled
          </div>

          <div className='w-1/2 text-gray-300 text-xl text-center'>Discover a powerful tool for students and mentors alike! Our interactive platform empowers you to effortlessly track your progress and take control of your Data Structures and Algorithms (DSA) journey. Gain key insights, mark questions as completed, and navigate your path to success. Seamlessly manage topics and questions with ease. Take your DSA learning to the next level with our user-friendly, all-in-one solution. Join us today and unlock the true potential of your DSA journey.</div>

          <div className='text-white text-2xl flex flex-row items-center justify-between gap-2 align-middle relative cursor-pointer hover:text-orange-400' onClick={()=>{navigate("/login")}}>Get started <FaArrowRightLong style={{position:'absolute', top:'6px', right:'-40px'}} color='orange'/> </div>


          <div className='flex flex-row text-white w-[80%] pt-20 justify-center items-center gap-32'>
            <img src={tracker_image} alt="" className='w-[40%]'/>
            <div className='w-[40%] text-xl text-gray-300'>
              <div>
              Simplify your journey with our comprehensive DSA progress tracker, exclusively for you. Our platform offers a seamless experience to manage your DSA learning.
              </div>

              {/* <div>is free to use</div> */}
              
              <ul className='marker:text-orange-500  list-disc list-inside mt-5'>
                <li className='text-base text-white '>DSALog is free to use</li>
              </ul>
            </div>
          </div>
        </div>


        <div className="homepage_bg"> 
          <div className='w-[80%] mx-auto mt-20'>
            <div className='flex flex-row my-20 justify-between pt-10'>
              <div className='flex flex-col items-center justify-center w-[38%]'>
                <div className='text-5xl'>Effortless access to selected Questions</div>
                <div className='py-7 text-xl'>
                Uncover data insights and pinpoint your learning progress effortlessly. Our platform dissects your DSA journey to provide in-depth analysis of your Questions and Topics. Access selected Questions with ease. We help you gain deeper knowledge, revealing your progress and making DSA learning effortless.
                </div>
              </div>

              <img src={question_image} className='w-[50%]'></img>
            </div>
            <div className='flex flex-row-reverse py-20 justify-between'>
              <div className='flex flex-col items-center justify-center w-[43%]'>
                <div className='text-5xl'>Topicwise grouping of Questions</div>
                <div className='py-7 text-xl'>
                Effortlessly organize and explore your DSA questions by topic. Our platform offers a streamlined approach to group and access questions based on their relevant topics. Say goodbye to clutter and hello to efficient learning. Experience the convenience of topic-wise grouping, making it easier than ever to tackle specific areas of DSA study. Take control of your learning journey with our intuitive topic organization.
                </div>
              </div>

              <img src={topic_image} className='w-[50%]'></img>
            </div>
          </div>
          <Footer/>
        </div>
        
      </div>
  )
}

