import { useEffect, useState } from 'react'
import { Table, Avatar } from 'antd'
import { useGetAllGuestsQuery } from '../../../../Redux/guestApis'

const RecentUsers = () => {
  const [page, setPage] = useState(1)
  const { data: guestList, isLoading: isGuestListLoading } =
    useGetAllGuestsQuery({
      page: page,
      limit: 10,
    })

  const [owners, setOwners] = useState([])

  useEffect(() => {
    if (guestList?.success && guestList?.data?.result) {
      const transformedData = guestList.data.result.map((guest, index) => ({
        key: guest._id,
        id: index + 1,
        name: guest.name,
        email: guest.email,
        avatar: guest.profile_image,
        checkInDate: new Date(guest.checkInDate).toLocaleDateString(),
        checkOutDate: new Date(guest.checkOutDate).toLocaleDateString(),
        hotel: guest?.hotel?.name || 'N/A',
        isBlocked: guest.user?.isBlocked || false,
        userId: guest.user?._id,
        // gender: guest.gender || 'N/A',
        guestId: guest._id,
      }))
      setOwners(transformedData)
    }
  }, [guestList])

  const columns = [
    {
      title: (
        <div className="font-bold !font-poppins text-xl text-[#11CD95]">
          S.lD
        </div>
      ),
      dataIndex: 'id',
      key: 'id',
      render: (text) => (
        <span className="text-[15px] !font-poppins text-gray-600 ">{text}</span>
      ),
    },
    {
      title: (
        <div className="font-bold !font-poppins text-xl text-[#11CD95]">
          Full Name
        </div>
      ),
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div className="flex items-center !font-poppins">
          <Avatar src={record.avatar} className="mr-2 w-10 h-10" />
          <span className="text-[15px]  text-gray-600">{text}</span>
        </div>
      ),
    },
    // {
    //   title: (
    //     <div className="font-bold text-xl !font-poppins text-[#11CD95]">
    //       Gender
    //     </div>
    //   ),
    //   dataIndex: 'gender',
    //   key: 'gender',
    //   render: (text) => (
    //     <span className="text-[15px] !font-poppins text-gray-600">{text}</span>
    //   ),
    // },

    // {
    //   title: (
    //     <div className="font-bold !font-poppins text-xl text-[#11CD95]">
    //       Select Language
    //     </div>
    //   ),
    //   dataIndex: 'language',
    //   key: 'language',
    //   render: (text) => (
    //     <span className="text-[15px] !font-poppins text-gray-600">{text}</span>
    //   ),
    // },
    {
      title: (
        <div className="font-bold !font-poppins text-xl text-[#11CD95]">
          Check in
        </div>
      ),
      dataIndex: 'checkInDate',
      key: 'checkInDate',
      render: (text) => (
        <span className="text-[15px] !font-poppins text-gray-600">{text}</span>
      ),
    },
    {
      title: (
        <div className="font-bold !font-poppins text-xl text-[#11CD95]">
          Check out
        </div>
      ),
      dataIndex: 'checkOutDate',
      key: 'checkOutDate',
      render: (text) => (
        <span className="text-[15px] !font-poppins text-gray-600">{text}</span>
      ),
    },
    {
      title: (
        <div className="font-bold !font-poppins text-xl text-[#11CD95]">
          Hotel
        </div>
      ),
      dataIndex: 'hotel',
      key: 'hotel',
      render: (text) => (
        <span className="text-[15px] !font-poppins text-gray-600">{text}</span>
      ),
    },
  ]

  return (
    <div className="mt-5 min-h-screen  ">
      <div className="bg-white  p-6 border-[#11CD95] border-2 rounded-md">
        <div className="text-[18px] mb-5 font-semibold !font-poppins ">
          Recent Users
        </div>
        <Table
          columns={columns}
          dataSource={owners}
          pagination={false}
          className="border-gray-200 rounded-lg overflow-hidden "
        />
      </div>
    </div>
  )
}

export default RecentUsers
