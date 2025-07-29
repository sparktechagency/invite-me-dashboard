import { useEffect, useState } from 'react'
import { MdNotificationsNone } from 'react-icons/md'
import { FaUserCircle } from 'react-icons/fa'
import { Popover } from 'antd'
import { Link } from 'react-router-dom'
import { useGetProfileDataQuery } from '../../../Redux/profileApis'
import { useGetAllNotificationsQuery } from '../../../Redux/notifications'

const Navbar = () => {
  const { data: profileData } = useGetProfileDataQuery()
  const [visible, setVisible] = useState(false)
  const { data } = useGetAllNotificationsQuery()

  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    if (data) {
      setNotifications(data?.data?.result)
    }
  }, [data])

  const handleVisibleChange = (visible) => {
    setVisible(visible)
  }

  const NotificationContent = () => (
    <div className="w-80 max-h-96 overflow-y-auto bg-white rounded-md  border p-4">
      <div className="border-b pb-2 flex justify-between items-center">
        <h3 className="text-lg font-semibold">Notifications</h3>
        <Link
          to="/notifications"
          className="text-[#11CD95] text-sm hover:underline"
        >
          See All Notifications
        </Link>
      </div>
      <div className="mt-3">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`mb-5 p-3 border-b ${
                notification.read ? '' : 'bg-green-100'
              }`}
            >
              <p className="text-sm text-gray-800">{notification.message}</p>
              <p className="text-xs text-gray-500 mt-1">
                {notification.createdAt}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No new notifications</p>
        )}
      </div>
    </div>
  )

  return (
    <div className="flex justify-between items-center   py-3 mx-4 rounded-md">
      <div></div>
      {/* <p className="text-2xl font-bold text-blue-600 ">Dashboard</p> */}
      <div className="flex items-center gap-4">
        <Popover
          content={NotificationContent}
          trigger="click"
          placement="bottomRight"
          visible={visible}
          onVisibleChange={handleVisibleChange}
        >
          <button className="relative text-2xl text-blue-600 p-2 rounded-full border">
            <MdNotificationsNone className="text-[#11CD95]  " />
            {notifications.some((notif) => !notif.read) && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs h-4 w-4 font-bold px-1 rounded-full">
                !
              </span>
            )}
          </button>
        </Popover>
        <Link
          to="/settings/profile"
          className="flex items-center gap-2 border border-[#11CD95] p-2 rounded-md"
        >
          <FaUserCircle className="text-3xl text-[#11CD95] " />
          <div className="text-left">
            <p className="text-sm font-semibold">{profileData?.data?.name}</p>
            <p className="text-xs">{profileData?.data?.email}</p>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Navbar
