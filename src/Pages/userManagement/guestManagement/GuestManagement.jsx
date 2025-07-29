import { useEffect, useState } from 'react'
import {
  Table,
  Modal,
  Button,
  message,
  Avatar,
  Tooltip,
  Image,
  Dropdown,
  Space,
  notification,
} from 'antd'
import { MdBlock, MdClose } from 'react-icons/md'
import { CgProfile, CgUnblock } from 'react-icons/cg'
import { DownOutlined } from '@ant-design/icons'
import {
  useGetAllGuestsQuery,
  useGetSingleGuestsQuery,
  useUpdateStatusMutation,
} from '../../../Redux/guestApis'
import { useGetAllHotelsQuery } from '../../../Redux/hotelApis'

const GuestManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [userDetails, setUserDetails] = useState(null)
  const [selectedId, setSelectedId] = useState(null)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [actionType, setActionType] = useState('')
  const [owners, setOwners] = useState([])

  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const [isBlocked, setIsBlocked] = useState('')

  const [hotelOptions, setHotelOptions] = useState([])
  const [selectedHotelID, setSelectedHotelID] = useState('')
  const [selectedHotelName, setSelectedHotelName] = useState('Select By Hotel')
  const [selectedStatus, setSelectedStatus] = useState('Select By Status')

  const [updateStatus] = useUpdateStatusMutation()

  const { data: guestList, isLoading: isGuestListLoading } =
    useGetAllGuestsQuery({
      searchTerm: searchQuery,
      page: page,
      limit: 10,
      ...(selectedHotelID ? { hotel: selectedHotelID } : {}),
      ...(isBlocked.trim() ? { isBlocked } : {}),
    })

  const {
    data: getSingleGuest,
    isLoading: isSingleGuestLoading,
    refetch,
  } = useGetSingleGuestsQuery(
    { selectedId: selectedId },
    {
      skip: !selectedId || !isModalOpen,
      refetchOnMountOrArgChange: true,
    }
  )

  const { data: hotelLists } = useGetAllHotelsQuery({})

  useEffect(() => {
    if (hotelLists?.success && hotelLists?.data?.result) {
      const transformedData = [
        {
          key: '',
          value: '',
          label: 'All Hotels',
        },
        ...hotelLists.data.result.map((hotel) => ({
          key: hotel._id,
          value: hotel._id,
          label: hotel.name,
        })),
      ]
      console.log('Hotel options:', transformedData)
      setHotelOptions(transformedData)
    }
  }, [hotelLists])

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
        guestId: guest._id,
      }))
      setOwners(transformedData)
    }
  }, [guestList])

  useEffect(() => {
    if (getSingleGuest?.success && getSingleGuest?.data) {
      const guest = getSingleGuest.data
      setUserDetails({
        name: guest.name,
        email: guest.email,
        avatar: guest.profile_image,
        photos: guest.pictures || [],
        about: guest.bio || 'No bio available',
        gender: guest.gender || 'N/A',
        checkIn: new Date(guest.checkInDate).toLocaleDateString(),
        checkOut: new Date(guest.checkOutDate).toLocaleDateString(),
        interest: guest.interests || [],
        livingIn: guest.address || 'N/A',
        language: Array.isArray(guest.language)
          ? guest.language.join(', ')
          : guest.language || 'N/A',
        hotel: guest.hotel || 'N/A',
        birthday: guest.dateOfBirth
          ? new Date(guest.dateOfBirth).toLocaleDateString()
          : 'N/A',
        phone: guest.phone || 'N/A',
        isBlocked: guest.user?.isBlocked || false,
        userId: guest.user,
        guestId: guest._id,
      })
    }
  }, [getSingleGuest])

  const handleView = (record) => {
    setSelectedId(record.key)
    setIsModalOpen(true)
    setUserDetails(null)
    refetch()
  }

  const handleAction = async (record, type) => {
    setUserDetails(record)
    setActionType(type)
    setIsConfirmModalOpen(true)
  }

  const handleConfirmAction = async () => {
    try {
      const newStatus = actionType === 'block'

      await updateStatus({
        userId: userDetails.userId,
      }).unwrap()

      setOwners((prevOwners) =>
        prevOwners.map((item) =>
          item.key === userDetails.key
            ? { ...item, isBlocked: newStatus }
            : item
        )
      )

      message.success(
        `User ${userDetails.name} has been ${
          actionType === 'block' ? 'blocked' : 'unblocked'
        }.`
      )

      setIsConfirmModalOpen(false)
    } catch (error) {
      message.error(`Failed to ${actionType} user. Please try again.`)
      console.error('Error updating user status:', error)
    }
  }

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
    setPage(1)
  }

  const filteredOwners = owners

  const columns = [
    {
      title: (
        <div className="font-bold !font-poppins text-xl text-[#11CD95]">
          S.ID
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
    {
      title: (
        <div className="font-bold text-xl !font-poppins text-[#11CD95]">
          Email
        </div>
      ),
      dataIndex: 'email',
      key: 'email',
      render: (text) => (
        <span className="text-[15px] !font-poppins text-gray-600">{text}</span>
      ),
    },
    {
      title: (
        <div className="font-bold !font-poppins text-xl text-[#11CD95]">
          Action
        </div>
      ),
      key: 'action',
      render: (_, record) => (
        <div className="flex space-x-2 !font-poppins items-center">
          <Tooltip title="View">
            <Button
              type="text"
              icon={<CgProfile size={20} className="!text-[#11CD95]" />}
              onClick={() => handleView(record)}
            />
          </Tooltip>
          <Tooltip title={record.isBlocked ? 'Unblock' : 'Block'}>
            <Button
              type="text"
              icon={
                record.isBlocked ? (
                  <CgUnblock size={23} className="!text-blue-500" />
                ) : (
                  <MdBlock size={22} className="!text-red-500" />
                )
              }
              onClick={() =>
                handleAction(record, record.isBlocked ? 'unblock' : 'block')
              }
            />
          </Tooltip>
        </div>
      ),
    },
  ]

  const statusList = [
    {
      label: 'All Status',
      key: '',
    },
    {
      label: 'Blocked',
      key: 'true',
    },
    {
      label: 'Unblocked',
      key: 'false',
    },
  ]

  // Fixed: Hotel selection handler
  const onClickHotelList = ({ key }) => {
    const selectedHotel = hotelOptions.find((hotel) => hotel.key === key)
    setSelectedHotelID(key)
    setPage(1)

    if (key === '') {
      setSelectedHotelName('All Hotels')
    } else {
      setSelectedHotelName(selectedHotel?.label || 'Unknown Hotel')
    }

    notification.success({
      message: `Filter by hotel: ${selectedHotel?.label || 'All Hotels'}`,
      placement: 'topRight',
    })
  }

  const onClickStatusList = ({ key }) => {
    const selectedStatus = statusList.find((status) => status.key === key)
    setSelectedStatus(selectedStatus.label)
    setIsBlocked(key)
    setPage(1)
    message.success({
      message: `Filter by status: ${
        key ? (key === 'true' ? 'Blocked' : 'Unblocked') : 'All Status'
      }`,
      placement: 'center',
    })
  }

  const handleTableChange = (pagination) => {
    setPage(pagination.current)
  }

  // Fixed: Modal close handler
  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedId(null)
    setUserDetails(null)
  }

  return (
    <div className="p-4 min-h-screen">
      <div className="bg-white p-6 border-[#11CD95] border-2 rounded-md">
        <div className="flex justify-between flex-wrap mb-10">
          <h1 className="text-2xl font-bold">Guests List</h1>
          <div className="flex gap-3 items-center justify-center">
            <div>
              <input
                type="text"
                placeholder="Search by name or email"
                value={searchQuery}
                onChange={handleSearch}
                className="w-[300px] h-[50px] outline-none p-2 border border-[#11CD95] rounded-lg"
              />
            </div>
            <div className="flex gap-3 items-center">
              <span>
                <Dropdown
                  menu={{ items: hotelOptions, onClick: onClickHotelList }}
                  className="cursor-pointer"
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <Space className="border border-[#11CD95] p-3 rounded-md">
                      {selectedHotelName}
                      <DownOutlined />
                    </Space>
                  </a>
                </Dropdown>
              </span>
            </div>

            <div className="flex gap-3 items-center">
              <span>
                <Dropdown
                  menu={{ items: statusList, onClick: onClickStatusList }}
                  className="cursor-pointer"
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <Space className="border border-[#11CD95] p-3 rounded-md">
                      {selectedStatus}
                      <DownOutlined />
                    </Space>
                  </a>
                </Dropdown>
              </span>
            </div>
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={filteredOwners}
          loading={isGuestListLoading}
          pagination={{
            current: page,
            pageSize: 10,
            total: guestList?.data?.meta?.total || 0,
            position: ['bottomCenter'],
            showSizeChanger: false,
          }}
          onChange={handleTableChange}
          className="border-gray-200 rounded-lg overflow-hidden"
        />
      </div>

      {/* User Details Modal */}
      <Modal
        title={null}
        open={isModalOpen}
        footer={null}
        onCancel={handleModalClose}
        width={600}
        className="rounded-lg overflow-hidden"
        closeIcon={<MdClose className="text-white top-4 right-4 text-lg" />}
        centered
      >
        {isSingleGuestLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="text-lg">Loading user details...</div>
          </div>
        ) : userDetails ? (
          <>
            <div className="bg-[#11CD95] p-2 -mt-6 -mx-6 mb-6 text-white text-center relative">
              <div className="mx-auto w-24 h-24 bg-gray-300 rounded-full overflow-hidden border-4 border-white">
                <Image
                  src={userDetails?.avatar}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                  width={100}
                  height={100}
                  fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7XPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3Ik1RnG4W+FgYxN..."
                />
              </div>
              <h2 className="text-xl font-bold mt-2 !font-poppins">
                {userDetails?.name}
              </h2>
            </div>

            <div className="px-6 !font-poppins">
              {userDetails?.photos?.length > 0 && (
                <div className="flex gap-3 mb-5 overflow-x-auto">
                  {userDetails.photos.map((photo, index) => (
                    <Image
                      key={index}
                      src={photo}
                      alt={`Photo ${index + 1}`}
                      width={100}
                      height={100}
                      className="w-20 h-20 object-cover rounded-md flex-shrink-0"
                    />
                  ))}
                </div>
              )}
              <div className="mb-4">
                <h3 className="text-gray-500 text-sm">
                  About {userDetails?.name}
                </h3>
                <p className="!font-poppins text-justify">
                  {userDetails?.about}
                </p>
              </div>
              <section className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <h3 className="text-gray-500 text-sm">Name</h3>
                  <p>{userDetails?.name}</p>
                </div>

                <div className="mb-4">
                  <h3 className="text-gray-500 text-sm">Gender</h3>
                  <p>{userDetails?.gender}</p>
                </div>

                <div className="mb-4">
                  <h3 className="text-gray-500 text-sm">Check in</h3>
                  <p>{userDetails?.checkIn}</p>
                </div>

                <div className="mb-4">
                  <h3 className="text-gray-500 text-sm">Check out</h3>
                  <p>{userDetails?.checkOut}</p>
                </div>

                <div className="mb-4">
                  <h3 className="text-gray-500 text-sm">Email</h3>
                  <p>{userDetails?.email}</p>
                </div>

                <div className="mb-4">
                  <h3 className="text-gray-500 text-sm">Phone</h3>
                  <p>{userDetails?.phone}</p>
                </div>

                <div className="mb-4">
                  <h3 className="text-gray-500 text-sm">Birthday</h3>
                  <p>{userDetails?.birthday}</p>
                </div>

                <div className="mb-4">
                  <h3 className="text-gray-500 text-sm">Living in</h3>
                  <p>{userDetails?.livingIn}</p>
                </div>

                <div className="mb-4">
                  <h3 className="text-gray-500 text-sm">Language</h3>
                  <p>{userDetails?.language}</p>
                </div>

                <div className="mb-4">
                  <h3 className="text-gray-500 text-sm">Hotel</h3>
                  <p>{userDetails?.hotel?.name}</p>
                </div>
              </section>
              {userDetails?.interest?.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-gray-500 text-sm">Interests</h3>
                  <div className="flex gap-2 flex-wrap">
                    {userDetails.interest.map((interest, index) => (
                      <div
                        key={index}
                        className="border text-[#11CD95] text-sm border-[#11CD95] rounded-md p-2"
                      >
                        {interest}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center h-40">
            <div className="text-lg">No user details available</div>
          </div>
        )}
      </Modal>

      {/* Confirm Block/Unblock Modal */}
      <Modal
        title={`Confirm ${
          actionType.charAt(0).toUpperCase() + actionType.slice(1)
        }`}
        open={isConfirmModalOpen}
        onOk={handleConfirmAction}
        onCancel={() => setIsConfirmModalOpen(false)}
        okText={<div>{actionType === 'block' ? 'Block' : 'Unblock'}</div>}
        okButtonProps={{ danger: actionType === 'block' }}
        centered
      >
        <p>
          Are you sure you want to {actionType}{' '}
          <span className="font-bold">{userDetails?.name}</span>?
        </p>
      </Modal>
    </div>
  )
}

export default GuestManagement
