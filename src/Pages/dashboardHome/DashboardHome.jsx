import DashboardCharts from './dashboardHomeComponents/dashboardChart/DashboardCharts'
import RecentUsers from './dashboardHomeComponents/dashboardChart/RecentUsers'
import OverView from './dashboardHomeComponents/overViewInformation/OverView'

const DashboardHome = () => {
  return (
    <div className=" h-screen overflow-y-auto scrollbar-none">
      <div className="mb-20">
        <OverView />
        <div className="mt-2   rounded-lg ">
          <DashboardCharts />
        </div>
        <div className="mt-2   rounded-lg  ">
          <RecentUsers />
        </div>
      </div>
    </div>
  )
}

export default DashboardHome
