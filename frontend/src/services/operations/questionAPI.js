import { toast } from "react-hot-toast"

import { apiConnector } from "../apiconnector"
import { questionEndpoints } from "../apis"
import { setLoading } from "../../slices/profileSlice"

const { ADD_QUESTION_API, DELETE_QUESTION_API } = questionEndpoints


export function addNewQuestion(topicName, title, url, token) {
    return async(dispatch) => {
      dispatch(setLoading(true));
      try{
        const response = await apiConnector("POST", ADD_QUESTION_API, {topicName, title, url}, {
          Authorisation: `Bearer ${token}`,
        });
  
        // console.log("ADD NEW TOPIC ....", response);
  
        if(!response.data.success) {
          throw new Error(response.data.message);
        }
  
        toast.success("Question Added Successfully");
        // setEmailSent(true);
      }
      catch(error) {
        console.log("ADD NEW QUESTION Error", error);
        toast.error("Failed to add New Question");
      }
      dispatch(setLoading(false));
    }
  }



  export function deleteQuestion(topicName, title, token) {
    return async(dispatch) => {
      dispatch(setLoading(true));
      try{
        const response = await apiConnector(
            "DELETE",
            DELETE_QUESTION_API + `/${topicName}/${title}`,
            null,
            {
                Authorisation: `Bearer ${token}`,
            },
          )
  
        console.log("DELETED QUESTION ....", response);
  
        if(!response.data.success) {
          throw new Error(response.data.message);
        }
  
        toast.success("Question Deleted Successfully");
        // setEmailSent(true);
      }
      catch(error) {
        console.log("DELETE QUESTION Error", error);
        toast.error("Failed to Delete Question");
      }
      dispatch(setLoading(false));
    }
  }