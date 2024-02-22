import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewQuestion } from '../services/operations/questionAPI';
import { useSelector } from 'react-redux/es/hooks/useSelector';

const QuestionOverlay = ({topic, onClose}) => {

    const dispatch = useDispatch();
    const {token}  = useSelector((state) => state.auth);


    const handleOverlayClick = (e) => {
        // Check if the click target is the overlay background
            if (e.target === e.currentTarget) {
                onClose(); // Close the overlay
            }
        };
    
        const [questionData, setQuestionData] = useState( {
            question:"", url:""
        })

        const { question, url } = questionData
    
        function changeHandler(event) {

            setQuestionData( (prevData) =>(
                {
                    ...prevData,
                    [event.target.name]:event.target.value
                }
            ) )
    
        }
    
          function submitHandler(event) {
            event.preventDefault()
            // console.log(topic);
            dispatch(addNewQuestion(topic, question, url, token))
            // navigate("/landing")
        }
    
        return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50" onClick={handleOverlayClick}>
            <div className="bg-white p-4 rounded-lg w-[30%]">
                <div className='mx-auto mb-4'>
                    Add Question
                </div>
                <div className='mb-3'>Topic - {topic}</div>
                <form onSubmit={submitHandler}>
                    <label className="w-full">
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-black">
                        Question <sup className="text-pink-200">*</sup>
                        </p>
                        <input
                        required
                        type="text"
                        name="question"
                        value={question}
                        onChange={changeHandler}
                        placeholder="enter question.."
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full rounded-[0.5rem] border-2 border-slate-500 bg-richblack-800 p-[12px] text-richblack-5"
                        />
                    </label>

                    <label className="w-full">
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-black">
                        URL <sup className="text-pink-200">*</sup>
                        </p>
                        <input
                        required
                        type="text"
                        name="url"
                        value={url}
                        onChange={changeHandler}
                        placeholder="enter question.."
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

export default QuestionOverlay