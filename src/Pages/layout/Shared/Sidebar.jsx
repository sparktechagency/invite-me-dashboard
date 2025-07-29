import { FaHotel, FaUserPlus, FaUsers } from 'react-icons/fa'
import { NavLink, useLocation } from 'react-router-dom'
import { MdDashboard, MdOutlineSettings, MdReportOff } from 'react-icons/md'

import carVerificationIcon from '../../../assets/car-verify-ison.svg'
import { useEffect, useState } from 'react'
import {
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiLogoutCircleLine,
} from 'react-icons/ri'
import { IoNotificationsSharp } from 'react-icons/io5'

const Sidebar = () => {
  const location = useLocation()
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [role, setRole] = useState('')

  useEffect(() => {
    const role = localStorage.getItem('role')
    setRole(role)
  }, [location.pathname])

  const settings = [
    {
      name: 'FAQ',
      link: '/settings/faq',
    },
    {
      name: 'Privacy Policy',
      link: '/settings/privacy-policy',
    },

    {
      name: 'Terms & condition',
      link: '/settings/terms-and-condition',
    },

    { name: 'Profile', link: '/settings/profile' },
  ]

  const logout = {
    name: 'Log out',
    link: '/login',
    icon: <RiLogoutCircleLine />,
  }

  const dashBoard = {
    name: 'Dashboard',
    link: '/',
    icon: <MdDashboard />,
  }

  const menuItemsSuperAdmin = [
    {
      name: 'Guests',
      link: '/guests-management',
      icon: <FaUsers />,
    },
    {
      name: 'Hotels',
      link: '/hotels-management',
      icon: <FaHotel />,
    },

    {
      name: 'Create Admin',
      link: '/make-admin',
      icon: <FaUserPlus />,
    },
    {
      name: 'Reports',
      link: '/reports',
      icon: <MdReportOff />,
    },
    {
      name: 'Notifications',
      link: '/notifications',
      icon: <IoNotificationsSharp />,
    },
  ]
  const menuItemsAdmin = [
    {
      name: 'Guests',
      link: '/guests-management',
      icon: <FaUserPlus />,
    },
    {
      name: 'Hotels',
      link: '/hotels-management',
      icon: <FaUserPlus />,
    },
  ]
  const isSettingsActive = location.pathname.includes('/settings')

  return (
    <div className=" w-[300px] h-[96vh] overflow-y-scroll px-3">
      <div>
        <img src={carVerificationIcon} alt="car-verification-icon" />
      </div>

      <ul className="mt-10">
        {/* Dashboard */}
        <NavLink
          to={dashBoard?.link}
          className={({ isActive }) =>
            `flex items-center py-3 rounded-3xl my-1 pl-6 hover:bg-[#29876b] cursor-pointer hover:text-white ${
              isActive ? 'bg-[#11CD95] text-white' : ''
            }`
          }
        >
          <span className="mr-4 text-xl">{dashBoard.icon}</span>
          <span>{dashBoard.name}</span>
        </NavLink>

        {/* User Management */}

        {/* Remaining menu items */}
        {role === 'superAdmin'
          ? menuItemsSuperAdmin.map((item, index) => (
              <NavLink
                to={item?.link}
                key={`remaining-${index}`}
                className={({ isActive }) =>
                  `flex items-center py-3 rounded-3xl my-1 pl-6 hover:bg-[#29876b] cursor-pointer hover:text-white ${
                    isActive ? 'bg-[#11CD95] text-white' : ''
                  }`
                }
              >
                <span className="mr-4 text-xl">{item.icon}</span>
                <span>{item.name}</span>
              </NavLink>
            ))
          : menuItemsAdmin.map((item, index) => (
              <NavLink
                to={item?.link}
                key={`remaining-${index}`}
                className={({ isActive }) =>
                  `flex items-center py-3 rounded-3xl my-1 pl-6 hover:bg-[#29876b] cursor-pointer hover:text-white ${
                    isActive ? 'bg-[#11CD95] text-white' : ''
                  }`
                }
              >
                <span className="mr-4 text-xl">{item.icon}</span>
                <span>{item.name}</span>
              </NavLink>
            ))}

        {/* Settings */}
        <li className="my-1">
          <div
            className={`flex items-center justify-between py-3 rounded-3xl pl-6 cursor-pointer ${
              isSettingsActive
                ? '!bg-[#11CD95] !text-white'
                : 'hover:bg-[#29876b] hover:text-white'
            }`}
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          >
            <div className="flex items-center">
              <span className="mr-4 text-xl">
                <MdOutlineSettings />
              </span>
              <span>Settings</span>
            </div>
            <span className="mr-4">
              {isSettingsOpen ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
            </span>
          </div>

          {isSettingsOpen && (
            <div className="ml-4">
              {settings.map((subItem, idx) => (
                <NavLink
                  key={idx}
                  to={subItem.link}
                  className={({ isActive }) =>
                    `flex items-center py-2 px-6 my-1 rounded-xl hover:bg-[#29876b] hover:text-white 
                      ${isActive ? '!bg-[#11CD95] text-white' : 'bg-green-50'}`
                  }
                >
                  <span className="ml-6">{subItem.name}</span>
                </NavLink>
              ))}
            </div>
          )}
        </li>

        <NavLink
          to={logout?.link}
          className={({ isActive }) =>
            `flex items-center py-3 rounded-3xl my-1 pl-6 hover:bg-[#29876b] cursor-pointer hover:text-white ${
              isActive ? 'bg-[#11CD95] text-white' : ''
            }`
          }
          onClick={() => localStorage.clear()}
        >
          <span className="mr-4 text-xl">{logout.icon}</span>
          <span>{logout.name}</span>
        </NavLink>
      </ul>
    </div>
  )
}

export default Sidebar
