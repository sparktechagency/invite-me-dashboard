import { useState } from 'react'
import { Table, Modal, Button, message, Avatar, Tooltip, Image } from 'antd'
import { MdBlock, MdClose } from 'react-icons/md'
import { CgProfile, CgUnblock } from 'react-icons/cg'

const UserManagementBusinessOwner = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [userDetails, setSelectedUser] = useState(null)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [actionType, setActionType] = useState('')
  const [owners, setOwners] = useState([
    {
      key: '1',
      id: '#1',
      businessName: 'Ahsan Autoshop',
      email: 'csilvers@verizon.com',
      contact: '(219) 555-0114',
      accountOwner: 'Ahsan',
      ownerPosition: 'Manager',
      accountOwnerEmail: 'Ahsan.owner@autoshop.com',
      accountOwnerContact: '(219) 555-0999',
      totalCar: '02',
      totalEmployee: '10',
      subscription: 'Basic plan',
      avatar: 'https://i.pravatar.cc/150?img=1',
      isBlocked: false,
    },
    {
      key: '2',
      id: '#2',
      businessName: 'Ahsan Autoshop 2',
      email: 'csilvers2@verizon.com',
      contact: '(219) 555-0115',
      accountOwner: 'Ahsan 2',
      ownerPosition: 'Assistant Manager',
      accountOwnerEmail: 'Ahsan2.owner@autoshop.com',
      accountOwnerContact: '(219) 555-0998',
      totalCar: '05',
      totalEmployee: '20',
      subscription: 'Premium plan',
      avatar: 'https://i.pravatar.cc/150?img=2',
      isBlocked: true,
    },
    {
      key: '3',
      id: '#3',
      businessName: 'Ahsan Autoshop 3',
      email: 'csilvers3@verizon.com',
      contact: '(219) 555-0116',
      accountOwner: 'Ahsan 3',
      ownerPosition: 'General Manager',
      accountOwnerEmail: 'Ahsan3.owner@autoshop.com',
      accountOwnerContact: '(219) 555-0997',
      totalCar: '10',
      totalEmployee: '30',
      subscription: 'Basic plan',
      avatar: 'https://i.pravatar.cc/150?img=3',
      isBlocked: true,
    },
    {
      key: '4',
      id: '#4',
      businessName: 'Ahsan Autoshop 4',
      email: 'csilvers4@verizon.com',
      contact: '(219) 555-0117',
      accountOwner: 'Ahsan 4',
      ownerPosition: 'Director',
      accountOwnerEmail: 'Ahsan4.owner@autoshop.com',
      accountOwnerContact: '(219) 555-0996',
      totalCar: '15',
      totalEmployee: '40',
      subscription: 'Premium plan',
      avatar: 'https://i.pravatar.cc/150?img=4',
      isBlocked: false,
    },
    {
      key: '5',
      id: '#5',
      businessName: 'Ahsan Autoshop 5',
      email: 'csilvers5@verizon.com',
      contact: '(219) 555-0118',
      accountOwner: 'Ahsan 5',
      ownerPosition: 'CEO',
      accountOwnerEmail: 'Ahsan5.owner@autoshop.com',
      accountOwnerContact: '(219) 555-0995',
      totalCar: '20',
      totalEmployee: '50',
      subscription: 'Basic plan',
      avatar: 'https://i.pravatar.cc/150?img=5',
      isBlocked: false,
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
      owner.businessName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      owner.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      owner.contact?.includes(searchQuery)
  )

  const columns = [
    {
      title: (
        <div className="font-bold text-[18px] !font-poppins">Serial No.</div>
      ),
      dataIndex: 'id',
      key: 'id',
      render: (text) => (
        <span className="text-[15px] text-gray-600 !font-poppins">{text}</span>
      ),
    },
    {
      title: (
        <div className="font-bold text-[18px] !font-poppins">Business name</div>
      ),
      dataIndex: 'businessName',
      key: 'businessName',
      render: (text, record) => (
        <div className="flex items-center !font-poppins">
          <Avatar src={record.avatar} className="mr-2 w-10 h-10" />
          <span className="text-[15px] text-gray-600 ">{text}</span>
        </div>
      ),
    },
    {
      title: <div className="font-bold text-[18px] !font-poppins">Email</div>,
      dataIndex: 'email',
      key: 'email',
      render: (text) => (
        <span className="text-[15px] text-gray-600 !font-poppins">{text}</span>
      ),
    },
    {
      title: (
        <div className="font-bold text-[18px] !font-poppins">
          Contact Number
        </div>
      ),
      dataIndex: 'contact',
      key: 'contact',
      render: (text) => (
        <span className="!font-poppins text-[15px] text-gray-600">{text}</span>
      ),
    },
    {
      title: (
        <div className="font-bold text-[18px] !font-poppins">Account Owner</div>
      ),
      dataIndex: 'accountOwner',
      key: 'accountOwner',
      render: (text) => (
        <span className="text-[15px] text-gray-600 !font-poppins">{text}</span>
      ),
    },
    {
      title: (
        <div className="font-bold text-[18px] !font-poppins">Total car</div>
      ),
      dataIndex: 'totalCar',
      key: 'totalCar',
      render: (text) => (
        <span className="text-[15px] text-gray-600 !font-poppins">{text}</span>
      ),
    },
    {
      title: (
        <div className="font-bold text-[18px] !font-poppins">
          Total employee
        </div>
      ),
      dataIndex: 'totalEmployee',
      key: 'totalEmployee',
      render: (text) => (
        <span className="text-[15px] text-gray-600 !font-poppins">{text}</span>
      ),
    },
    {
      title: (
        <div className="font-bold text-[18px] !font-poppins">Subscription</div>
      ),
      dataIndex: 'subscription',
      key: 'subscription',
      render: (text) => (
        <span
          className={
            text.includes('Premium')
              ? 'text-blue-600 !font-poppins text-[15px]'
              : 'text-[15px] !font-poppins text-gray-600'
          }
        >
          {text}
        </span>
      ),
    },
    {
      title: <div className="font-bold !font-poppins text-[18px]">Action</div>,
      key: 'action',
      render: (_, record) => (
        <div className="flex space-x-2 items-center !font-poppins">
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
          <h1 className="text-2xl font-bold mb-6">All Business</h1>

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
        width={600}
        className="rounded-lg overflow-hidden"
        closeIcon={
          <MdClose className="text-white flex items-center justify-center  top-4 right-4 text-lg" />
        }
        centered
      >
        <div className="bg-blue-600 p-6 -mt-6 -mx-6 mb-6 text-white text-center relative">
          <div className="mx-auto w-24 h-24 bg-gray-300 rounded-full overflow-hidden border-4 border-white">
            <Image
              src={userDetails?.avatar}
              alt="Avatar"
              className="w-full h-full object-cover"
              width={100}
              height={100}
            />
          </div>
          <h2 className="text-xl font-bold mt-2 !font-poppins">
            {userDetails?.businessName}
          </h2>
          <p className="text-sm !font-poppins">Business</p>
        </div>

        <div className="px-6">
          {[
            { label: 'Business Name', value: userDetails?.businessName },
            { label: 'Business Email', value: userDetails?.email },
            { label: 'Business Contact No', value: userDetails?.contact },
            { label: 'Account Owner Name', value: userDetails?.accountOwner },

            {
              label: 'Account owner Position',
              value: userDetails?.ownerPosition,
            },
            {
              label: 'Account owner Email',
              value: userDetails?.accountOwnerEmail,
            },
            {
              label: 'Account owner Contact no',
              value: userDetails?.accountOwnerContact,
            },

            { label: 'Total Car', value: userDetails?.totalCar },
            { label: 'Total Employee', value: userDetails?.totalEmployee },
            {
              label: 'Subscription',
              value: userDetails?.subscription,
              className: 'text-blue-500',
            },
          ].map((field, index) => (
            <div key={index} className="mb-4 !font-poppins">
              <h3 className="text-gray-500 text-sm !font-poppins">
                {field.label}
              </h3>
              <p className={field.className || ''}>{field.value}</p>
            </div>
          ))}
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

export default UserManagementBusinessOwner
