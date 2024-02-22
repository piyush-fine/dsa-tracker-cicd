import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getQuestions } from '../services/operations/topicAPI';
import { eraseDoneQuestion, getDoneQuestions, setDoneQuestion } from '../services/operations/profileAPI';
import { useDispatch, useSelector } from 'react-redux';
import lc_logo from "../assets/lc_logo.png"
import cn_logo from "../assets/cn_logo.jpeg"
import gfg_logo from "../assets/gfg_logo.png"

export const Questions = () => {

  const {token}  = useSelector((state) => state.auth);

  const {topicName, topicID} = useParams();

  const [questions, setQuestions] = useState([]);
  const [doneQuestions, setDoneQuestions] = useState([]);
  const [statQuestions, setStatQuestions] = useState([]);
  const [numDone, setNumDone] = useState(0);


  const dispatch = useDispatch();


  const getQues = async() => {
    try{
        const response = await getQuestions(topicID);
        setQuestions(response);
        // console.log("ALL Questions..." , response);
    }
    catch(error) {
        console.log("Unable to Fetch Questions");
    }
  }

  const getDoneQues = async ()=>{
    try{
      const response = await getDoneQuestions(token,topicID);
      setDoneQuestions(response);
      console.log("ALL Done Questions..." , response);
    }
    catch(error) {
        console.log("Unable to Fetch Done Questions");
    }
  }


  useEffect(()=>{
    getQues();
    getDoneQues();
  },[token, topicID])


  useEffect(()=>{
    func();
  },[questions, doneQuestions])


  function func()
  {
    const questionsWithStatus = questions.map((question) => ({
      ...question,
      isDone: doneQuestions.includes(question._id),
    }));
    setStatQuestions(questionsWithStatus);
    // console.log("Questions with Status ", questionsWithStatus);
    setNumDone(doneQuestions.length);
  }

  const handelSetQuesChange = (index)=>{

    const flag = statQuestions[index].isDone;
    // console.log(flag);

    let newArr = statQuestions.map((item, i)=>{
      if(index == i)
      {
        return { ...item, isDone: !flag};
      }
      else{
        return item;
      }
    });
    setStatQuestions(newArr)

    if(flag)
    {
      setNumDone(numDone - 1);
    }
    else{
      setNumDone(numDone + 1);
    }
  }

  function solveHandler(index, e){

    const flag = statQuestions[index].isDone;
    const title = statQuestions[index].title;

    if(flag)
    {
      dispatch(eraseDoneQuestion(topicName, title, token));
    }
    else{
      dispatch(setDoneQuestion(topicName, title, token));
    }
    handelSetQuesChange(index);

  }


  return (
    <div className='flex flex-col items-center justify-center my-10 gap-5'>

      <div className='text-2xl font-semibold tracking-widest'>Topic - <span className='text-rose-400 font-mono'>{`${topicName}`}</span></div>

      <div className='text-md  '>{`${numDone}/${questions.length} - `}<span className='font-semibold text-sky-600'>Done</span></div>

      <table className='outline outline-2 outline-black w-[80%]'>
        <thead className='bg-cyan-400 text-md h-10'>
          <tr className='outline outline-1  outline-black'>
            <th className='outline outline-1 py-3 outline-black w-[5%]'>id</th>
            <th className='outline outline-1 outline-black w-[75%]'>Question</th>
            <th className='outline outline-1 outline-black'>Link</th>
            <th className='outline outline-1 outline-black '>Status</th>
          </tr>
        </thead>
        <tbody>
          {
            statQuestions.map((q, index)=>{
              // console.log(index);
              // console.log(q);
              const {title, link, isDone} = q;
              return(
                <tr key={index} className={`outline-2 outline-black h-10 ${isDone?'bg-green-100':'bg-slate-50'}`}>
                  
                  <td className='outline outline-1 outline-black  mx-auto text-sm text-center'>{index}</td>

                  <td className='outline outline-1 outline-black  mx-auto text-sm px-5'>{title}</td>

                  <td className='outline outline-1 outline-black flex justify-center items-center'>

                    <a target='_blank' href={`${link}`}>
                      {link.includes("leetcode") ? <img src={lc_logo} className=' w-10 rounded-full bg-white border-none p-2'/> 
                      : link.includes("codingninjas") ? <img src={cn_logo} className=' w-10 rounded-full bg-white border-none p-2'/> 
                      : <img src={gfg_logo} className=' w-10 rounded-full bg-white border-none p-2'/>}
                    </a>

                    </td>


                  <td className={`outline outline-1 outline-black  mx-auto text-sm text-center ${isDone?'bg-green-100':'bg-slate-100'}`}>

                    <select className={`w-full h-full px-4  outline-none text-sm mx-auto ${isDone?'bg-green-100':'bg-slate-100'} cursor-pointer`} value={isDone} onChange={(e)=>solveHandler(index,e)}>
                      <option value={false} >Unsolved</option>
                      <option value={true}>Solved</option>
                    </select>

                  </td>

                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  )
}
