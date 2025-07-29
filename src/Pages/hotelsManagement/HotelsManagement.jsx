import { useState } from 'react'
import { Button, Image, Input, Modal, Table, Upload } from 'antd'
import { DeleteOutlined, UploadOutlined } from '@ant-design/icons'
import toast from 'react-hot-toast'
import { MdClose } from 'react-icons/md'
import { IoAddCircleOutline } from 'react-icons/io5'
import { FaEdit } from 'react-icons/fa'
import {
  useCreateHotelsMutation,
  useDeleteHotelMutation,
  useGetAllHotelsQuery,
  useUpdateHotelMutation,
} from '../../Redux/hotelApis'
import Loader from '../Loader'

function HotelsManagement() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [hotelToDelete, setHotelToDelete] = useState(null)
  const [editingHotel, setEditingHotel] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [imageFile, setImageFile] = useState(null)

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    wifiIp: '',
    hotel_image: '',
  })

  const {
    data: hotelResponse,
    isLoading,
    isError,
    refetch,
  } = useGetAllHotelsQuery({
    searchTerm: searchQuery.trim().toLowerCase(),
  })

  const [createHotel] = useCreateHotelsMutation()
  const [updateHotel] = useUpdateHotelMutation()
  const [deleteHotel, { isLoading: isDeleting }] = useDeleteHotelMutation()

  const hotels = hotelResponse?.data?.result || []

  if (isLoading) return <Loader />

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Failed to load hotels. Please try again later.</p>
      </div>
    )
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const showAddModal = (hotel = null) => {
    if (hotel) {
      setFormData({
        name: hotel.name,
        location: hotel.location,
        wifiIp: hotel.wifiIp,
        hotel_image: hotel.hotel_image,
      })
      setEditingHotel(hotel)
    } else {
      resetForm()
    }
    setIsAddModalOpen(true)
  }

  const handleAddCancel = () => {
    setIsAddModalOpen(false)
    setEditingHotel(null)
    resetForm()
    setImageFile(null)
  }

  const resetForm = () => {
    setFormData({
      name: '',
      location: '',
      wifiIp: '',
      hotel_image: '',
    })
  }

  const handleAddSubmit = async () => {
    const { name, location, wifiIp } = formData

    if (!name || !location || !wifiIp) {
      toast.error('Please fill all required fields')
      return
    }
    const formDataToSend = new FormData()
    formDataToSend.append('data', JSON.stringify({ name, location, wifiIp }))

    if (imageFile) {
      formDataToSend.append('hotel_image', imageFile)
    }

    try {
      if (editingHotel) {
        await updateHotel({
          id: editingHotel._id,
          otherData: formDataToSend,
        }).unwrap()
        toast.success('Hotel updated successfully')
      } else {
        if (!imageFile) {
          toast.error('Please upload a hotel logo')
          return
        }
        await createHotel(formDataToSend).unwrap()
        toast.success('Hotel added successfully')
      }
      refetch()
      handleAddCancel()
    } catch (error) {
      toast.error(error?.data?.message || 'Something went wrong')
      console.error('Operation failed:', error)
    }
  }

  const showDeleteModal = (hotel) => {
    setHotelToDelete(hotel)
    setIsDeleteModalOpen(true)
  }

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false)
    setHotelToDelete(null)
  }

  const handleDeleteConfirm = async () => {
    if (hotelToDelete) {
      try {
        await deleteHotel(hotelToDelete._id).unwrap()
        toast.success('Hotel deleted successfully')
        refetch()
        handleDeleteCancel()
      } catch (error) {
        toast.error(error?.data?.message || 'Failed to delete hotel')
        console.error('Delete operation failed:', error)
      }
    }
  }

  const uploadProps = {
    beforeUpload: (file) => {
      setImageFile(file)

      const reader = new FileReader()
      reader.onload = (e) => {
        setFormData((prev) => ({
          ...prev,
          hotel_image: e.target.result,
        }))
      }
      reader.readAsDataURL(file)

      return false
    },
  }

  const columns = [
    {
      title: <div className="font-bold text-xl !text-poppins">Serial</div>,
      dataIndex: 'id',
      key: 'id',
      render: (text, record, index) => (
        <span className="text-gray-600 text-[15px] !text-poppins">
          {index + 1}
        </span>
      ),
    },
    {
      title: <div className="font-bold text-xl !text-poppins">Hotel Name</div>,
      dataIndex: 'name',
      key: 'name',
      render: (text) => (
        <span className="text-gray-600 text-[15px] !text-poppins">{text}</span>
      ),
    },
    {
      title: <div className="font-bold text-xl !text-poppins">Hotel Logo</div>,
      dataIndex: 'hotel_image',
      key: 'hotel_image',
      render: (text) => (
        <span className="text-gray-600 text-[15px] !text-poppins">
          <Image
            src={text.startsWith('https') ? text : `https://${text}`}
            alt="Hotel Logo"
            className="w-10 h-10 rounded-lg object-cover"
            width={50}
            height={50}
            fallback="/placeholder-image.png"
          />
        </span>
      ),
    },
    {
      title: <div className="font-bold text-xl !text-poppins">Location</div>,
      dataIndex: 'location',
      key: 'location',
      render: (text) => (
        <span className="text-[15px] !text-poppins">{text}</span>
      ),
    },
    {
      title: <div className="font-bold text-xl !text-poppins">WI-FI IP</div>,
      dataIndex: 'wifiIp',
      key: 'wifiIp',
      render: (text) => (
        <span className="text-[15px] !text-poppins">{text}</span>
      ),
    },
    {
      title: <div className="font-bold text-xl !text-poppins">Action</div>,
      key: 'action',
      render: (_, record) => (
        <div className="flex gap-2 items-center">
          <Button
            type="text"
            icon={<DeleteOutlined className="!text-[15px]" />}
            onClick={() => showDeleteModal(record)}
            className="text-red-500 hover:text-red-700"
            loading={isDeleting && hotelToDelete?._id === record._id}
          />
          <Button
            type="text"
            onClick={() => showAddModal(record)}
            className="text-[#11CD95] !flex !items-center !justify-center !text-[16px] hover:text-blue-700"
          >
            <FaEdit />
          </Button>
        </div>
      ),
    },
  ]

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }
  return (
    <div className="p-4 h-screen">
      <div className="bg-white shadow !p-6 border-[#11CD95] border-2  rounded-md">
        <div className="flex justify-between items-center mb-6 ">
          <h1 className="text-2xl font-bold">Hotel List</h1>
          <div className="flex items-center gap-4">
            <div>
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearch}
                className="w-[300px] h-[50px] outline-none p-2 border border-[#11CD95] rounded-lg"
              />
            </div>
            <Button
              type="primary"
              onClick={() => showAddModal()}
              className="!bg-[#11CD95] hover:!bg-[#34a180] h-[50px] text-md py-5 flex items-center justify-center gap-2"
            >
              <IoAddCircleOutline className="text-2xl" />
              Add Hotel
            </Button>
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={hotels}
          rowKey="id"
          pagination={{ pageSize: 7, position: ['bottomCenter'] }}
        />
      </div>

      {/* Add/Edit Modal */}
      <Modal
        title={
          <div className="text-[28px] text-[#11CD95] !text-extrabold text-center mb-4 !text-poppins">
            {editingHotel ? 'Edit Hotel Information' : 'Add Hotel Information'}
          </div>
        }
        open={isAddModalOpen}
        onCancel={handleAddCancel}
        footer={null}
        closeIcon={<MdClose className="text-2xl !text-red-500" />}
        className="top-8"
        centered
      >
        <div className="py-4">
          <div className="mb-4">
            <label className="block text-[15px] font-bold !text-poppins mb-2">
              Hotel Name
            </label>
            <Input
              name="name"
              placeholder="Enter hotel name"
              value={formData.name}
              onChange={handleInputChange}
              className="!text-poppins h-[42px]"
            />
          </div>

          <div className="mb-4">
            <label className="block text-[15px] font-bold !text-poppins mb-2">
              Location
            </label>
            <Input
              name="location"
              placeholder="Enter hotel location"
              value={formData.location}
              onChange={handleInputChange}
              className="!text-poppins h-[42px]"
            />
          </div>

          <div className="mb-4">
            <label className="block text-[15px] font-bold !text-poppins mb-2">
              WI-FI IP (CIDR FORMAT)
            </label>
            <Input
              name="wifiIp"
              placeholder="Enter WiFi IP address"
              value={formData.wifiIp}
              onChange={handleInputChange}
              className="!text-poppins h-[42px]"
            />
          </div>

          <div className="mb-4">
            <label className="block text-[15px] font-bold !text-poppins mb-2">
              Hotel Logo
            </label>
            <div className="flex items-center gap-4">
              {formData.hotel_image && (
                <Image
                  src={formData.hotel_image}
                  alt="Hotel Logo Preview"
                  width={60}
                  height={60}
                  className="rounded-md"
                />
              )}
              <Upload {...uploadProps} showUploadList={false}>
                <Button icon={<UploadOutlined />}>Upload Logo</Button>
              </Upload>
            </div>
          </div>

          <Button
            type="primary"
            block
            onClick={handleAddSubmit}
            className="h-[40px] !bg-[#11CD95] hover:!bg-[#34a180] border-none w-full"
          >
            {editingHotel ? 'Update Hotel' : 'Add Hotel'}
          </Button>
        </div>
      </Modal>

      {/* Delete Modal */}
      <Modal
        title={null}
        open={isDeleteModalOpen}
        onCancel={handleDeleteCancel}
        footer={null}
        closeIcon={<MdClose className="text-xl !text-red-500" />}
        width={300}
        centered
      >
        <div className="py-4 text-center">
          <p className="text-lg font-medium">Confirm Deletion?</p>
          <p className="text-gray-500 text-md mb-6">
            Do you want to delete {hotelToDelete?.name}?
          </p>
          <Button
            type="primary"
            danger
            onClick={handleDeleteConfirm}
            className="bg-red-500 text-white hover:bg-red-600 border-none w-full"
          >
            {isDeleting ? 'Deleting...' : ' Delete'}
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default HotelsManagement
