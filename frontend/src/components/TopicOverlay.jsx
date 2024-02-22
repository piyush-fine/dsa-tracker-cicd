import React from 'react'
import { useState } from 'react';
import { addNewTopic } from '../services/operations/topicAPI';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/hooks/useSelector';


const TopicOverlay = ({onClose}) => {

    const {token}  = useSelector((state) => state.auth);
    const dispatch = useDispatch()

    const handleOverlayClick = (e) => {
    // Check if the click target is the overlay background
        if (e.target === e.currentTarget) {
            onClose(); // Close the overlay
        }
    };

    const [topic, setTopic] = useState("");

    function changeHandler(event) {

    setTopic( event.target.value);

    }

    function submitHandler(event) {
        event.preventDefault()
        dispatch(addNewTopic(topic, token))
        // console.log("Hello Jiiii.......................",res)
        // onClose();
    }
    

    return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50" onClick={handleOverlayClick}>
        <div className="bg-white p-4 rounded-lg w-[30%]">
            <div className='mx-auto mb-4'>
                Add Topic
            </div>
            <form onSubmit={submitHandler}>
                <label className="w-full">
                    {/* <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-black">
                    Topic <sup className="text-pink-200">*</sup>
                    </p> */}
                    <input
                    required
                    type="text"
                    name="topic"
                    value={topic}
                    onChange={changeHandler}
                    placeholder="Enter Title"
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full rounded-[0.5rem] border-2 border-slate-500 bg-richblack-800 p-[12px] text-richblack-5"
                    />
                </label>

                <button
                    type="submit"
                    className="mt-6 w-16 rounded-[8px] bg-yellow-400 py-[8px] px-[12px] font-medium text-richblack-900 ml-[40%]"
                >
                    Add
                </button>
            </form>


        </div>
    </div>
    );
}

export default TopicOverlay