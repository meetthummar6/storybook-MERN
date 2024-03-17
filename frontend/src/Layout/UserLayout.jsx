import { Outlet } from "react-router-dom"
import UserSidebar from "../components/userdata/userSidebar"
const UserLayout = () => {
  return (
    <div className="w-screen h-screen flex px-10 py-4 gap-10">
      <UserSidebar />
      <Outlet/>
    </div>
  )
}

export default UserLayout