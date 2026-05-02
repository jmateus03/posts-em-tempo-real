import { Navigate } from "react-router-dom"

function PrivateRoute({ user, children }) {
  if (!user) {
    return <Navigate to="/" />
  }

  return children
}

export default PrivateRoute