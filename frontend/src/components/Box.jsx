import React, { useEffect } from 'react'
import { useState } from 'react';
import { getQuestions } from '../services/operations/topicAPI';
import {TiDelete} from 'react-icons/ti'
import QuestionOverlay from './QuestionOverlay';
import { useDispatch } from 'react-redux';
import { deleteQuestion } from '../services/operations/questionAPI';
import { useSelector } from 'react-redux/es/hooks/useSelector';

const Box = ({topic}) => {

    const dispatch = useDispatch();
    const {token}  = useSelector((state) => state.auth);
    // console.log("helooo ............", topic);
    

    const [isTableVisible, setTableVisible] = useState(false);
    const [questions, setQuestions] = useState([]);

    const toggleTableVisibility = () => {
        // Toggle the visibility state when the topic name is clicked
        setTableVisible(!isTableVisible);
        getQues();
    };


    const getQues = async() => {
        try{
            const response = await getQuestions(topic._id);
            setQuestions(response);
            // console.log("ALL Questions..." , response);
        }
        catch(error) {
            console.log("Unable to Fetch Questions");
        }
    }

    const [showOverlay, setShowOverlay] = useState(false);

    const handleOverlayClick = () => {
        setShowOverlay(!showOverlay);
        getQues();
    };

    const removeQuestion = (event, ques) => {
         dispatch(deleteQuestion(topic.topic_name, ques, token))
         .then(()=>{getQues();});
    }



        
  return (
    <div className='flex flex-col justify-center items-center w-[60%]'>
        <div className='flex items-center justify-center bg-rose-100 my-2 py-2 w-[95%] border-b-2 border-red-300 border-r-2 cursor-pointer' onClick={toggleTableVisibility}>
            {topic.topic_name}
        </div>
        {
            isTableVisible && (
                <table className='w-[90%]'>
                    {/* <thead>
                        <tr className='flex justify-center items-center'>
                            <td className='flex items-center justify-center bg-red-100 my-2 py-2 w-[95%] outline outline-1 outline-black'>Questions</td>
                        </tr>
                    </thead> */}
                    <tbody>
                    {
                        !questions ? (<tr><td>Loading...</td></tr>) : !questions.length ? (<tr><td>NO Topic Listed Till Now.....</td></tr>) : 
                        (questions.map((question)=>{
                            // console.log("hi.....",question);
                            return (typeof(question) == "object") ? 
                            (
                                <tr className='flex justify-evenly items-center' key={question._id}>
                                    <td className='flex items-center pl-5 bg-red-100 my-2 py-2 outline outline-1 outline-black text-sm w-[90%]'>{question.title}</td>
                                    <td className='cursor-pointer' onClick={(e)=> removeQuestion(e, question.title)}><TiDelete size={20}/></td>
                                </tr>
                            ):
                            (<tr><td>Nan</td></tr>)
                        })            
                        )
                    }
                    <tr className='flex justify-center items-center'>
                        <td className='flex items-center justify-center bg-red-300 my-2 py-2 w-[95%] outline outline-1 outline-black cursor-pointer' onClick={handleOverlayClick}> + </td>
                    </tr>
                    </tbody>
                </table>
            )
        }

        {showOverlay && <QuestionOverlay topic={topic.topic_name} onClose={handleOverlayClick} />}
        
    </div>
  )
}

export default Box