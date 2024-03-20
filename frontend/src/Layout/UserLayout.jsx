import { Outlet } from "react-router-dom"
import UserSidebar from "../components/userdata/userSidebar"
import { useNavigate } from "react-router-dom"
import { useContext, useEffect } from "react"
import AuthContext from "../context/AuthContext"
const UserLayout = () => {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  useEffect(() => {
    if (user == null || user == undefined) {
      navigate("/login")
      return null
    }
  },[user])
  return (
    <div className="w-screen flex px-10 py-4 gap-10">
      <UserSidebar />
      <Outlet/>
    </div>
  )
}

export default UserLayout