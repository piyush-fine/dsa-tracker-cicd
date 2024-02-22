import React, { useState, useEffect } from 'react'
import { getAllTopics } from '../services/operations/topicAPI';
import Box from '../components/Box';
import TopicOverlay from '../components/TopicOverlay';
import {RiDeleteBin6Fill} from 'react-icons/ri'
import { deleteTopic } from '../services/operations/topicAPI';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../components/Header';



export const Configuration = () => {

    const [topics, setTopics] = useState(null);
    const [showOverlay, setShowOverlay] = useState(false);

    const dispatch = useDispatch();

    const {token} = useSelector((state) => state.auth);


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

    useEffect(()=> {
        getTopics();        
      },[showOverlay]);

    

    const handleOverlayClick = () => {
        setShowOverlay(!showOverlay);
        // getTopics();
    };

    const removeTopic = async (event, topi) => {
        await dispatch(deleteTopic(topi, token))
        .then(()=>{getTopics();});
   }


      

  return (
    <div>
        <Header/>

    
    <div className=' flex justify-center items-center flex-col pb-10 pt-28'>
        
        <div className='bg-cyan-700 text-md h-10 outline outline-1  outline-black w-[70%] flex items-center justify-center text-white'>Topics</div>


        {
            !topics ? (<div>Loading...</div>) : !topics.length ? (<div>NO Topic Listed Till Now.....</div>) : 
            (topics.map((topic)=>{
                // console.log("hi.....",topic);
                return (typeof(topic) == "object") ? 
                (
                    <div className='flex justify-center items-center w-full'>
                    <Box topic={topic} key={topic._id}/>
                    <RiDeleteBin6Fill className='cursor-pointer' onClick={(e)=> removeTopic(e, topic.topic_name)}/>
                    </div>
                ):
                (<div>NaN</div>)
            })            
            )
        }
        <div className='w-[100%] flex items-center justify-center cursor-pointer'>
            <div className='flex items-center justify-center bg-rose-700 my-2 py-2 w-[67%] outline outline-1 outline-black text-white' onClick={handleOverlayClick}>
                +
            </div>

            {showOverlay && <TopicOverlay onClose={handleOverlayClick}/>}
        </div>
        
    </div>
    </div>
  )
}