import React from 'react'
import { useNavigate } from 'react-router-dom';

export const Card = ({cardData}) => {

    // console.log(cardData);
    const navigate = useNavigate();

    function clickHandler()
    {
        navigate(`/questions/${cardData.topic_name}/${cardData._id}`);
    }

    function calcPercentage(totalDoneQuestions, totalQuestions){
      let percentage = totalDoneQuestions/totalQuestions * 100;
      return percentage.toFixed(2);
    }

    function calcPer(totalDoneQuestions, totalQuestions){
      let percentage = totalDoneQuestions/totalQuestions * 100;
      return percentage.toFixed(0);
    }


  return (
    <div className={`w-[25%] h-40 border-2 m-5 rounded-xl p-3 px-5 ${cardData.done_questions>0?'border-black bg-green-50':'border-black bg-cyan-50'} transition ease-in-out hover:scale-105 cursor-pointer`} onClick={() => clickHandler()} >

        <div className='text-lg font-semibold tracking-widest'>{cardData.topic_name}</div>

        <div className='text-md my-1'>Total Questions {cardData.total_questions}</div>

        <div className='text-sm tracking-widest font-normal'> {cardData.done_questions>0 ? ( <span>{cardData.total_questions - cardData.done_questions} More to go</span>) : (<span>Not Started yet </span>)} </div>

        <div className='mt-4'>{
          cardData.done_questions>0 == true ? 
          (<div>
            <div className='text-xs font-medium tracking-wide m-1'>{`${calcPer(cardData.done_questions, cardData.total_questions)}% Done `}</div>
          
           <div className='w-full mx-auto   h-4 bg-gray-50 border-2 border-emerald-900 rounded-md'>
              <div style={{ width: `${calcPer(cardData.done_questions, cardData.total_questions)}%`}} className=' rounded-sm h-full bg-orange-500'></div>
           </div>
           </div>)
          :null
        }</div>
 
    </div>
  )
}
