import { toast } from "react-hot-toast"

import { apiConnector } from "../apiconnector"
import { topicEndpoints } from "../apis"
import { setLoading } from "../../slices/profileSlice"

const { GET_ALL_TOPICS_API, ADD_TOPIC_API, GET_QUESTIONS_API, DELETE_TOPIC_API } = topicEndpoints


export async function getAllTopics() {
  const toastId = toast.loading("Loading...")
  let result = []
  try {
    const response = await apiConnector("GET", GET_ALL_TOPICS_API)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response.data.data
  } catch (error) {
    console.log("GET_ALL_TOPICS_API API ERROR............", error)
    toast.error("Could Not Get All Topics")
  }
  toast.dismiss(toastId)
  return result
}


export async function getQuestions(topicID) {
  const toastId = toast.loading("Loading...")
  let result = []
  try {
    const response = await apiConnector("GET", 
    GET_QUESTIONS_API + `/${topicID}`,);

    // console.log("Get Questions RESPONSE ... ", response);

    if (!response.data.success) {
      throw new Error(response.data.message)
    }

    result = response.data.data
  } catch (error) {
    console.log("GET_ALL_TOPICS_API API ERROR............", error)
    toast.error("Could Not Get All Topics")
  }
  toast.dismiss(toastId)
  return result
}


export function addNewTopic(topicName, token) {
  return async(dispatch) => {
    dispatch(setLoading(true));
    try{
      const response = await apiConnector("POST", ADD_TOPIC_API, {topicName}, {
        Authorisation: `Bearer ${token}`,
      });

      console.log("ADD NEW TOPIC ....", response);

      if(!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Topic Added Successfully");
    }
    catch(error) {
      // console.log("ADD NEW TOPIC Error", error);
      toast.error("Failed to add New Topic");
    }
    dispatch(setLoading(false));
  }
}


export function deleteTopic(topicName, token) {
  return async(dispatch) => {
    dispatch(setLoading(true));
    try{
      const response = await apiConnector(
          "DELETE",
          DELETE_TOPIC_API + `/${topicName}`,
          null,
          {
              Authorisation: `Bearer ${token}`,
          },
        )

      // console.log("DELETED TOPIC ....", response);

      if(!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Topic Deleted Successfully");
      // setEmailSent(true);
    }
    catch(error) {
      console.log("DELETE TOPIC Error", error);
      toast.error("Failed to Delete Topic");
    }
    dispatch(setLoading(false));
  }
}
