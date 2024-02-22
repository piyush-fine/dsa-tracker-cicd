import React from 'react'
import insta_logo from "../assets/insta_logo.jpeg"
import linkedin_logo from "../assets/linkedin_logo.png"
import github_logo from "../assets/github_logo.png"

export const Footer = () => {
  return (
    <div className='border-t border-gray-400 min-h-[175px] max-w-[95%]  mx-auto flex flex-row justify-between pt-4 px-5 overflow-x-hidden'>
        <div className=''> 
            <div className='font-semibold text-lg mb-3'>Follow</div>
            <div className='flex gap-3'>
                <a target='_blank' href='https://www.instagram.com/piyush_upwar'><img src={insta_logo} className='w-10 bg-slate-50'/></a>
                <a target='_blank' href='https://www.linkedin.com/in/piyush-upwar-8927301b6'><img src={linkedin_logo} className='w-10 bg-slate-50'/></a>
                <a target='_blank' href='https://github.com/upwarpiyush'><img src={github_logo} className='w-10 bg-slate-50'/></a>
                </div>
            
        </div>
        
        <div className=''>
            <div className='font-semibold text-lg mb-3' >Contact</div>
            <div className='text-sm mb-2'>piyushupwar@gmail.com</div>
            <div className='text-sm'>+91-7666033092</div>
        </div>
        
        <div>
            {/* <div className='font-semibold text-lg'>Phone</div> */}
            <div className='w-72 text-sm mt-5'>This <a target='_blank' href='https://github.com/upwarpiyush/DSA-Tracker' className='cursor-pointer text-blue-700 underline'>project</a> is your personal DSA progress tracker based on 450 DSA Questions Sheet by <span className='font-semibold'>Love Babbar</span>.</div>
            {/* <a>github</a> */}
            
        </div>
        {/* <div className='text-sm'>
            © 2023 by piyush upwar
        </div> */}
    </div>
  )
}
