import { Link, useNavigate } from "react-router-dom"
import { useContext } from "react"
import AuthContext from "../../context/AuthContext"
import axios from "axios"
const UserSidebar = () => {
    const navigate=useNavigate()
    const { user, logout } = useContext(AuthContext)
    const handleLogout = async() => {
      const res = await axios.post('/api/v1/users/logout',
      {},
      { withcredentials: true })
      console.log("Logout")
      console.log(res)
      logout()
      navigate("/")
    }
  return (
    <div className="w-1/6 flex flex-col items-center p-4 border-r bg-neutral-50 shadow border-r-gray-300 gap-2">
      <div className="text-gray-700 mt-4 font-medium text-lg border border-blue-900 px-2 py-1 w-full text-center">
        <Link to={`/user/${user?._id}/profile`} className="hover:text-blue-800">Profile</Link>
      </div>
      <div className="text-gray-700 mt-4 font-medium text-lg border border-blue-900 px-2 py-1 w-full text-center">
        <Link to={`/user/${user?._id}/stories`} className="hover:text-blue-800">Stories</Link>
      </div>
      <div className="text-gray-700 mt-4 font-medium text-lg border border-blue-900 px-2 py-1 w-full text-center">
        <Link to={`/user/${user?._id}/bookmarks`} className="hover:text-blue-800">Bookmarks</Link>
      </div>    
      <div className="text-gray-700 mt-4 font-medium text-lg border border-blue-900 px-2 py-1 w-full text-center">
        <Link to={`/user/${user?._id}/settings`} className="hover:text-blue-800">Settings</Link>
      </div>
      <div className="text-gray-700 mt-4 font-medium text-lg border border-blue-900 px-2 py-1 w-full text-center">
        <button onClick={handleLogout} className="hover:text-blue-800">Logout</button>
      </div>
    </div>
  )
}

export default UserSidebar