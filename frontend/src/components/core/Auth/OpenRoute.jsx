// This will prevent authenticated users from accessing this route
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

function OpenRoute({ children }) {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)

  // console.log("hi............",user);

  if (token === null) {
    return children
  } 
  if(user.accountType == 'Admin')
  {
    return <Navigate to="/config"/>
  }
  else {
    return <Navigate to="/landing" />
  }
}

export default OpenRoute