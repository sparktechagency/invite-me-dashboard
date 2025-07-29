import { Outlet } from 'react-router-dom'
import Sidebar from './Shared/Sidebar'
import Navbar from './Shared/Navbar'

const Dashboard = () => {
  return (
    <div className="p-4 box-border rounded-md flex justify-between items-start overflow-hidden h-screen">
      <div className="w-[300px] rounded-md overflow-hidden ">
        <Sidebar />
      </div>
      <div className="w-[calc(100vw-288px)] px-3">
        <Navbar />
        <div className="h-[94vh] overflow-y-scroll">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
