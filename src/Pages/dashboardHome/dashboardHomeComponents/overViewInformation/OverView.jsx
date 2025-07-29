import { useEffect, useState } from 'react'
import { Dropdown, notification, Space, Spin, Empty } from 'antd'
import { DownOutlined } from '@ant-design/icons'

import active_users from '../../../../assets/overview_img/active_users.svg'
import current_connection_img from '../../../../assets/overview_img/current_connection_img.svg'
import total_connections_img from '../../../../assets/overview_img/total_connections_img.svg'
import total_users_img from '../../../../assets/overview_img/total_users_img.svg'

import { useGetMetaDataQuery } from '../../../../Redux/metaData'
import { useGetAllHotelsQuery } from '../../../../Redux/hotelApis'

const StatCard = ({ icon, title, value, valueColor = 'text-gray-800' }) => (
  <div className="rounded-md border border-[#11CD95]/30 h-[200px] p-4 flex flex-col items-center justify-center shadow-sm bg-white">
    <img src={icon} alt={title} className="w-[40px] h-[40px]" />
    <span className="my-3 font-semibold text-[18px] text-gray-700">
      {title}
    </span>
    <div className={`text-2xl font-bold ${valueColor}`}>{value ?? 0}</div>
  </div>
)

const OverView = () => {
  const [selectedHotelName, setSelectedHotelName] = useState('Select By Hotel')
  const [selectedHotelID, setSelectedHotelID] = useState('')
  const [hotelOptions, setHotelOptions] = useState([])
  const [stats, setStats] = useState([])

  const {
    data: metaData,
    isLoading,
    isError,
  } = useGetMetaDataQuery(
    { hotelId: selectedHotelID },
    {
      pollingInterval: 5000,
    } 
  )

  const { data: hotelLists, isSuccess: isHotelsSuccess } = useGetAllHotelsQuery(
    {}
  )

  useEffect(() => {
    if (isHotelsSuccess && hotelLists?.data?.result) {
      const options = [
        { key: '', label: 'All Hotels' },
        ...hotelLists.data.result.map((hotel) => ({
          key: hotel._id,
          label: hotel.name,
        })),
      ]
      setHotelOptions(options)
    }
  }, [hotelLists, isHotelsSuccess])

  useEffect(() => {
    if (metaData?.success) {
      const newStats = [
        {
          icon: total_users_img,
          title: 'Total Users',
          value: metaData?.data?.totalUser,
          valueColor: 'text-[#11CD95]',
        },
        {
          icon: active_users,
          title: 'Active Users',
          value: metaData?.data?.totalActiveUser,
          valueColor: 'text-[#11CD95]',
        },
        {
          icon: total_connections_img,
          title: 'Total Connections',
          value: metaData?.data?.totalConnection,
          valueColor: 'text-[#11CD95]',
        },
        {
          icon: current_connection_img,
          title: 'Curr. Connections',
          value: metaData?.data?.totalActiveConnection,
          valueColor: 'text-[#11CD95]',
        },
      ]
      setStats(newStats)
    }
  }, [metaData])

  const onClickHotelList = ({ key }) => {
    const selectedHotel = hotelOptions.find((hotel) => hotel.key === key)
    setSelectedHotelID(key)
    setSelectedHotelName(selectedHotel?.label || 'All Hotels')

    notification.success({
      message: `Filtered by hotel: ${selectedHotel?.label || 'All Hotels'}`,
      placement: 'topRight',
    })
  }

  return (
    <div className="w-full p-4 border-2 border-[#11CD95] rounded-md bg-white shadow-md">
      {/* Header Filter */}
      <div className="mb-5 flex gap-3 items-center flex-wrap">
        <span
          className="bg-[#11CD95] text-white px-5 py-2 rounded-md cursor-pointer"
          onClick={() => {
            setSelectedHotelID('')
            setSelectedHotelName('All Hotels')
            notification.info({
              message: 'Viewing stats globally',
              placement: 'topRight',
            })
          }}
        >
          Globally
        </span>

        <Dropdown
          menu={{ items: hotelOptions, onClick: onClickHotelList }}
          className="cursor-pointer"
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space className="border border-[#11CD95] px-5 py-2 rounded-md text-[#11CD95] font-semibold">
              {selectedHotelName}
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>

      {/* Stats Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center h-[150px]">
          <Spin size="large" />
        </div>
      ) : isError ? (
        <Empty description="Failed to load statistics" />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat.icon}
              title={stat.title}
              value={stat.value}
              valueColor={stat.valueColor}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default OverView
