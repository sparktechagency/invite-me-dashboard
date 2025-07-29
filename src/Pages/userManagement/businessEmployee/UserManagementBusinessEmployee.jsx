import { useState } from 'react'
import { Table, Modal, Button, message, Avatar, Tooltip, Image } from 'antd'
import { MdBlock, MdClose } from 'react-icons/md'
import { CgProfile, CgUnblock } from 'react-icons/cg'

const UserManagementBusinessEmployee = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [userDetails, setSelectedUser] = useState(null)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [actionType, setActionType] = useState('')
  const [owners, setOwners] = useState([
    {
      key: '1',
      id: '#1',
      name: 'Mahfuz',
      email: 'backelbay@att.com',
      contact: '(201) 555-0124',
      totalCar: '01',
      subscription: 'Free plan',
      avatar: 'https://i.pravatar.cc/150?img=10',
      dob: '17 dec, 2024',
      isBlocked: false,
      date: '17 dec, 2024',
      uplineBusiness: 'Ahsan Autoshop',
      assignedCar: '01',
    },
    {
      key: '2',
      id: '#2',
      name: 'Ahsan',
      email: 'csilvers@verizon.com',
      contact: '(219) 555-0114',
      totalCar: '02',
      subscription: 'Premium plan',
      avatar: 'https://i.pravatar.cc/150?img=11',
      dob: '17 dec, 2024',
      isBlocked: false,
      date: '17 dec, 2024',
      uplineBusiness: 'Ahsan Autoshop',
      assignedCar: '10',
    },
    {
      key: '3',
      id: '#3',
      name: 'Mahbub Rahman',
      email: 'qamaho@mail.com',
      contact: '(316) 555-0116',
      totalCar: '03',
      subscription: 'Free plan',
      avatar: 'https://i.pravatar.cc/120?img=12',
      dob: '17 dec, 2024',
      isBlocked: false,
      date: '17 dec, 2024',
      uplineBusiness: 'Ahsan Autoshop',
      assignedCar: '20',
    },
    {
      key: '4',
      id: '#4',
      name: 'Mahbub Rahman',
      email: 'qamaho@mail.com',
      contact: '(316) 555-0116',
      totalCar: '02',
      subscription: 'Free plan',
      avatar: 'https://i.pravatar.cc/150?img=13',
      dob: '17 dec, 2024',
      isBlocked: true,
      date: '17 dec, 2024',
      uplineBusiness: 'Ahsan Autoshop',
      assignedCar: '0',
    },
    {
      key: '5',
      id: '#5',
      name: 'Mahbub Rahman',
      email: 'qamaho@mail.com',
      contact: '(316) 555-0116',
      totalCar: '05',
      subscription: 'Free plan',
      dob: '17 dec, 2024',
      avatar: 'https://i.pravatar.cc/150?img=14',
      isBlocked: false,
      date: '17 dec, 2024',
      uplineBusiness: 'Ahsan Autoshop',
      assignedCar: '10',
    },
  ])

  const [searchQuery, setSearchQuery] = useState('')

  const handleView = (record) => {
    setSelectedUser(record)
    setIsModalOpen(true)
  }

  const handleAction = (record, type) => {
    setSelectedUser(record)
    setActionType(type)
    setIsConfirmModalOpen(true)
  }

  const handleConfirmAction = () => {
    const newStatus = actionType === 'block'

    setOwners((prevOwners) =>
      prevOwners.map((item) =>
        item.key === userDetails.key ? { ...item, isBlocked: newStatus } : item
      )
    )

    message.success(
      `User ${userDetails.name} has been ${
        actionType === 'block' ? 'blocked' : 'unblocked'
      }.`
    )

    setIsConfirmModalOpen(false)
  }

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }

  const filteredOwners = owners.filter(
    (owner) =>
      owner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      owner.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      owner.contact.includes(searchQuery)
  )

  const columns = [
    {
      title: <div className="font-bold text-xl !font-poppins">Serial No.</div>,
      dataIndex: 'id',
      key: 'id',
      render: (text) => (
        <span className="text-[15px] text-gray-600 !font-poppins">{text}</span>
      ),
    },
    {
      title: <div className="font-bold text-xl !font-poppins">Name</div>,
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div className="flex items-center !font-poppins">
          <Avatar src={record.avatar} className="mr-2 w-10 h-10" />
          <span className="text-[15px] text-gray-600">{text}</span>
        </div>
      ),
    },
    {
      title: <div className="font-bold text-xl !font-poppins">Date</div>,
      dataIndex: 'date',
      key: 'date',
      render: (text) => (
        <div className="flex items-center">
          <span className="text-[15px] text-gray-600 !font-poppins">
            {text}
          </span>
        </div>
      ),
    },
    {
      title: <div className="font-bold text-xl !font-poppins">Email</div>,
      dataIndex: 'email',
      key: 'email',
      render: (text) => (
        <span className="text-[15px] text-gray-600 !font-poppins">{text}</span>
      ),
    },
    {
      title: (
        <div className="font-bold text-xl !font-poppins">Contact Number</div>
      ),
      dataIndex: 'contact',
      key: 'contact',
      render: (text) => (
        <span className="text-[15px] text-gray-600 !font-poppins">{text}</span>
      ),
    },
    {
      title: (
        <div className="font-bold text-xl !font-poppins">Upline Business</div>
      ),
      dataIndex: 'uplineBusiness',
      key: 'uplineBusiness',
      render: (text) => (
        <span className="text-[15px] text-gray-600 !font-poppins">{text}</span>
      ),
    },

    {
      title: <div className="font-bold text-xl !font-poppins">Action</div>,
      key: 'action',
      render: (_, record) => (
        <div className="flex space-x-2 items-center">
          <Tooltip title="View">
            <Button
              type="text"
              icon={<CgProfile size={20} className="!text-blue-600" />}
              onClick={() => handleView(record)}
            />
          </Tooltip>
          <Tooltip title={record.isBlocked ? 'Unblock' : 'Block'}>
            <Button
              type="text"
              icon={
                record.isBlocked ? (
                  <CgUnblock size={23} className="!text-green-500" />
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

  return (
    <div className="p-4 bg-gray-200 min-h-screen">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between flex-wrap">
          <h1 className="text-2xl font-bold mb-6">All Employee</h1>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearch}
              className="w-[300px] outline-none p-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={filteredOwners}
          pagination={{
            defaultPageSize: 10,
            position: ['bottomCenter'],
          }}
          className="border-gray-200 rounded-lg overflow-hidden"
        />
      </div>

      {/* User Details Modal */}
      <Modal
        title={null}
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
        width={500}
        className="rounded-lg overflow-hidden"
        closeIcon={<MdClose className="text-white  top-4 right-4 text-lg" />}
        centered
      >
        <div className="bg-blue-600 p-6 -mt-6 -mx-6 mb-6 text-white text-center relative !font-poppins">
          <div className="mx-auto w-24 h-24 bg-gray-300 rounded-full overflow-hidden border-4 border-white !font-poppins">
            <Image
              src={userDetails?.avatar}
              alt="Avatar"
              className="w-full h-full object-cover"
              width={100}
              height={100}
            />
          </div>
          <h2 className="text-xl font-bold mt-2 !font-poppins">
            {userDetails?.name}
          </h2>
          <p className="text-sm !font-poppins">Employee</p>
        </div>

        <div className="px-6 !font-poppins">
          <div className="mb-4">
            <h3 className="text-gray-500 text-sm">Name</h3>
            <p>{userDetails?.name}</p>
          </div>

          <div className="mb-4">
            <h3 className="text-gray-500 text-sm ">Email</h3>
            <p>{userDetails?.email}</p>
          </div>

          <div className="mb-4">
            <h3 className="text-gray-500 text-sm">Contact No</h3>
            <p>{userDetails?.contact}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-gray-500 text-sm">Upline</h3>
            <p>{userDetails?.uplineBusiness}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-gray-500 text-sm">Assigned Car</h3>
            <p>{userDetails?.assignedCar}</p>
          </div>
        </div>
      </Modal>

      {/* Confirm Block/Unblock Modal */}
      <Modal
        title={
          <div className="font-bold text-xl !font-poppins">
            Confirm {actionType.charAt(0).toUpperCase() + actionType.slice(1)}
          </div>
        }
        open={isConfirmModalOpen}
        onOk={handleConfirmAction}
        onCancel={() => setIsConfirmModalOpen(false)}
        okText={actionType === 'block' ? 'Block' : 'Unblock'}
        okButtonProps={{ danger: actionType === 'block' }}
        centered
      >
        <p className="!font-poppins">
          Are you sure you want to {actionType} {userDetails?.name}?
        </p>
      </Modal>
    </div>
  )
}

export default UserManagementBusinessEmployee
