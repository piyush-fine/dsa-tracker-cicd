import { toast } from "react-hot-toast"

import { apiConnector } from "../apiconnector"
import { profileEndpoints } from "../apis"
import { setLoading } from "../../slices/profileSlice"

const { GET_ALL_DONE_API, SET_QUESTION_DONE_API, ERASE_QUESTION_DONE_API, GET_DONE_QUESTIONS_API } = profileEndpoints


export async function getAllDoneTopics(token) {
  const toastId = toast.loading("Loading...")
  let result = []
  try {
    const response = await apiConnector(
      "GET",
      GET_ALL_DONE_API,
      null,
      {
          Authorisation: `Bearer ${token}`,
      }
    )
    

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response.data.data
  } catch (error) {
    console.log("GET_ALL_DONE_API API ERROR............", error)
    toast.error(error.response.data.message)
  }
  toast.dismiss(toastId)
  return result
}


export async function getDoneQuestions(token, topicID) {
  const toastId = toast.loading("Loading...")
  // const url = ` ${/topicID}`;
  let result = []
  try {
    const response = await apiConnector(
      "GET",
      GET_DONE_QUESTIONS_API+`/${topicID}`,
      null,
      {
          Authorisation: `Bearer ${token}`,
      },
    )
    

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response.data.data
  } catch (error) {
    console.log("GET_ALL_DONE_API API ERROR............", error)
    // toast.error(error.response.data.message)
  }
  toast.dismiss(toastId)
  return result
}


export function setDoneQuestion(topicName, title, token) {
  return async(dispatch) => {
    dispatch(setLoading(true));
    try{
      const response = await apiConnector("POST", SET_QUESTION_DONE_API, {topicName, title}, {
        Authorisation: `Bearer ${token}`,
      });

      console.log("RESET Password RESPONSE ... ", response);


      if(!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success(`${title} solved`);
    }
    catch(error) {
      console.log("RESET PASSWORD TOKEN Error", error);
      toast.error(`Unable to mark ${title} solved`);
    }
    dispatch(setLoading(false));
  }
}


export function eraseDoneQuestion(topicName, title, token) {
  return async(dispatch) => {
    dispatch(setLoading(true));
    try{
      const response = await apiConnector("POST", ERASE_QUESTION_DONE_API, {topicName, title}, {
        Authorisation: `Bearer ${token}`,
      });

      console.log("RESET Password RESPONSE ... ", response);


      if(!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success(`${title} unsolved`);
    }
    catch(error) {
      console.log("RESET PASSWORD TOKEN Error", error);
      toast.error(`Unable to mark ${title} unsolved`);
    }
    dispatch(setLoading(false));
  }
}