import { useState } from 'react'
import { Button, Input, Modal, Table } from 'antd'
import {
  DeleteOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from '@ant-design/icons'
import toast from 'react-hot-toast'
import { MdClose } from 'react-icons/md'
import { IoAddCircleOutline } from 'react-icons/io5'
import { FaEdit } from 'react-icons/fa'
import {
  useCreateAdminMutation,
  useDeleteAdminMutation,
  useGetAllAdminQuery,
  useUpdateAdminMutation,
} from '../../Redux/adminApis'
import Loader from '../Loader'

function MakeAdmin() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState(null)
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [editingUser, setEditingUser] = useState(null)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    userType: 'Admin',
  })

  const {
    data: adminResponse,
    isLoading,
    isError,
    refetch,
  } = useGetAllAdminQuery()

  const [createAdmin, { isLoading: isCreating }] = useCreateAdminMutation()
  const [updateAdmin, { isLoading: isUpdating }] = useUpdateAdminMutation()
  const [deleteAdmin, { isLoading: isDeleting }] = useDeleteAdminMutation()

  const users = adminResponse?.data?.result

  if (isLoading) return <Loader />

  if (isError) {
    return (
      <div className="flex justify-center items-center">
        <p>Failed to load admins. Please try again later.</p>
      </div>
    )
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const showAddModal = (user = null) => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        password: '',
        userType: 'Admin',
      })
      setEditingUser(user)
    }
    setIsAddModalOpen(true)
  }

  const handleAddCancel = () => {
    setIsAddModalOpen(false)
    setEditingUser(null)
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      userType: 'Admin',
    })
    setPasswordVisible(false)
  }

  const handleAddSubmit = async () => {
    if (
      !formData.name ||
      !formData.email ||
      (!formData.password && !editingUser)
    ) {
      toast.error('Please fill all required fields')
      return
    }

    try {
      if (editingUser) {
        await updateAdmin({
          id: editingUser._id,
          name: formData.name,
          email: formData.email,
        }).unwrap()
        toast.success('Admin updated successfully')
      } else {
        await createAdmin({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }).unwrap()
        toast.success('Admin added successfully')
      }
      handleAddCancel()
      refetch()
    } catch (error) {
      toast.error(error?.data?.message || 'Operation failed')
    }
  }

  const showDeleteModal = (user) => {
    setUserToDelete(user)
    setIsDeleteModalOpen(true)
  }

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false)
    setUserToDelete(null)
  }

  const handleDeleteConfirm = async () => {
    if (userToDelete) {
      try {
        await deleteAdmin(userToDelete._id).unwrap()
        toast.success('Admin deleted successfully')
        setIsDeleteModalOpen(false)
        setUserToDelete(null)
        refetch()
      } catch (error) {
        toast.error('Failed to delete user')
        console.log(error)
      }
    }
  }

  const columns = [
    {
      title: <div className="font-bold text-xl !text-poppins">S.No</div>,
      dataIndex: 'sno',
      key: 'sno',
      render: (text, record, index) => (
        <span className="text-gray-600 text-[15px] !text-poppins">
          {index + 1}
        </span>
      ),
    },
    {
      title: <div className="font-bold text-xl !text-poppins">Name</div>,
      dataIndex: 'name',
      key: 'name',
      render: (text) => (
        <span className="text-gray-600 text-[15px] !text-poppins">{text}</span>
      ),
    },
    {
      title: <div className="font-bold text-xl !text-poppins">Email</div>,
      dataIndex: 'email',
      key: 'email',
      render: (text) => (
        <span className="text-gray-600 text-[15px] !text-poppins">{text}</span>
      ),
    },
    {
      title: <div className="font-bold text-xl !text-poppins">User Type</div>,
      dataIndex: 'userType',
      key: 'userType',
      render: () => (
        <span className="text-[#11CD95] text-[15px] !text-poppins">Admin</span>
      ),
    },
    {
      title: <div className="font-bold text-xl !text-poppins">Action</div>,
      key: 'action',
      render: (_, record) => (
        <div className="flex gap-2 items-center ">
          <Button
            type="text"
            icon={<DeleteOutlined className="!text-[15px]" />}
            onClick={() => showDeleteModal(record)}
            className="text-red-500 hover:text-red-700"
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

  return (
    <div className="p-4 min-h-screen">
      <div className="bg-white shadow !p-6 border-[#11CD95] border-2 rounded-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold ">Create Admin</h1>
          <Button
            type="primary"
            onClick={() => showAddModal()}
            className="!bg-[#11CD95] hover:!bg-[#34a180] text-md py-5 flex items-center justify-center gap-2"
          >
            <IoAddCircleOutline className="text-2xl" />
            Make Admin
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={users}
          rowKey="_id"
          pagination={false}
        />
      </div>

      {/* Add/Edit Modal */}
      <Modal
        title={
          <div className="text-[28px] text-[#11CD95] !text-extrabold text-center mb-4 !text-poppins">
            {editingUser ? 'Edit Admin Information' : 'Add Admin Information'}
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
              Name
            </label>
            <Input
              name="name"
              placeholder="Type here"
              value={formData.name}
              onChange={handleInputChange}
              className="!text-poppins h-[42px]"
            />
          </div>
          <div className="mb-4">
            <label className="block text-[15px] font-bold !text-poppins mb-2">
              Email
            </label>
            <Input
              name="email"
              placeholder="Type here"
              value={formData.email}
              onChange={handleInputChange}
              className="!text-poppins h-[42px]"
            />
          </div>
          {!editingUser && (
            <div className="mb-4">
              <label className="block text-[15px] font-bold !text-poppins mb-2">
                Password
              </label>
              <Input.Password
                name="password"
                placeholder="Type here"
                value={formData.password}
                onChange={handleInputChange}
                iconRender={(visible) =>
                  visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                }
                visibilityToggle={{
                  visible: passwordVisible,
                  onVisibleChange: setPasswordVisible,
                }}
                className="!text-poppins h-[42px]"
              />
            </div>
          )}
          <div className="mb-6">
            <label className="block text-[15px] font-bold !text-poppins mb-2">
              User Type
            </label>
            <Input
              name="userType"
              value={formData.userType}
              disabled
              className="!text-poppins h-[42px]"
            />
          </div>
          <Button
            type="primary"
            block
            onClick={handleAddSubmit}
            className="h-[40px] !bg-[#11CD95] hover:!bg-[#34a180] border-none w-full"
            loading={isCreating || isUpdating}
          >
            {editingUser ? 'Update' : 'Submit'}
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
          <p className="text-lg font-medium ">Confirm Deletion?</p>
          <p className="text-gray-500 text-md mb-6">
            Do you want to delete this Admin?
          </p>
          <Button
            type="primary"
            danger
            onClick={handleDeleteConfirm}
            className="bg-blue-500 text-white hover:bg-blue-600 border-none w-full"
            loading={isDeleting}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default MakeAdmin
