import React, { useEffect } from 'react'
import { useState } from 'react';
import { getAllTopics } from '../services/operations/topicAPI';
import { getAllDoneTopics } from '../services/operations/profileAPI';
import { useSelector } from 'react-redux';
import { Card } from '../components/Card';
import { Header } from '../components/Header';

export const Landing = () => {

  const [topics, setTopics] = useState(null);
  const [done, setDone] = useState(null);

  const [doneTopics, setDoneTopics] = useState(null);

  const [totalQuestions, setTotalQuestions] = useState(0);
  const [totalDoneQuestions, setTotalDoneQuestions] = useState(0);

  // const [percentage, setPercentage] = useState(0);

  const {token}  = useSelector((state) => state.auth);


  const getTopics = async() => {
      try{
          const response = await getAllTopics();
          setTopics(response);
          // console.log("ALL Topics..." , response);
      }
      catch(error) {
          console.log("Unable to Fetch Topics");
      }
  }

  const getDoneTopics = async()=>{
    try{
      const response = await getAllDoneTopics(token);
      // console.log("I AM HERE>>>>>>", response);
      setDone(response);
    }
    catch(error)
    {
      console.log("Unable to Fetch Done Topics")
    }
  }

  useEffect(()=> {
    getTopics();
    getDoneTopics();
    
  },[]);

  useEffect(()=>{
    fun();
  },[done, topics])



  function fun(){
    const arr = [];
    let doneQue = 0;
    let totalQue = 0;
    if(done && topics)
    {
      // const arr = [];
      // let doneQue = 0;
      // let totalQue = 0;
      for(const item of topics)
      {
        let flag = false;
        for(const doneItem of done)
        {
          if(item._id === doneItem.topic_id._id )
          {
            flag = true;
            const obj1 = {
              ...item, 
              done_questions: doneItem.question_id.length,
              total_questions: item.Questions.length,
            }
            arr.push(obj1);
            doneQue += doneItem.question_id.length;
            totalQue += item.Questions.length;
          }
        }
        if(flag === false)
        {
          const obj2 = {
            ...item, 
            done_questions: 0,
            total_questions: item.Questions.length,
          }
          // console.log(obj);
          arr.push(obj2);
          totalQue += item.Questions.length;
        }
      }

      // console.log(arr);
      // console.log(doneQue);
      // console.log(totalQue);
      // setDoneTopics(arr);
      // setTotalDoneQuestions(doneQue);
      // setTotalQuestions(totalQue);
    }
    setDoneTopics(arr);
    setTotalDoneQuestions(doneQue);
    setTotalQuestions(totalQue);
  }


  function calcPercentage(){
    let percentage = totalDoneQuestions/totalQuestions * 100;
    // percentage.toFixed(2);
    return percentage.toFixed(2);
  }
   



  return (
    <div className=''>
      <Header/>
    <div className=' flex justify-center items-center flex-col pb-10 pt-[100px] relative bg-white'>
      <div className='z-10 fixed pt-5 top-20 bg-white w-full flex flex-col items-center justify-center'>
      <div className='text-xl font-medium tracking-wider '>Your Getway To Crack DSA 😍</div>


      <div className=' text-md mt-2 mb-5 flex items-center justify-center flex-col gap-3'>
          <div className='text-lg text-sky-800'>Total Questions Solved : <span> {totalDoneQuestions} </span> <span>{`( ${calcPercentage()}% Done )`}</span></div>
          <div className='w-[60vw]  h-4 bg-gray-100 border-2 border-gray-900 rounded-sm'>
            <div style={{ width: `${calcPercentage()}%`}} className=' rounded-sm h-full bg-orange-500'></div>
          </div>
        </div>
        </div>

        {/* Topic Cards */}
        <div className='pt-28'>
        {
          !doneTopics ? (<div> Loading... </div>) : !doneTopics.length ? (<p>NO Topic Listed Till Now.....</p>) : 
          (<div className=' w-full flex items-center justify-center flex-wrap '>
            {
              doneTopics.map((card)=>{
                return (typeof(card) == "object") ? (<Card cardData={card} key={card._id}></Card>):(<div>NaN</div>)
              })
            }
          </div>)
        }
        </div>
    </div>
    </div>
  )
}

