import { Button, Popconfirm } from 'antd'
import { FiEdit } from 'react-icons/fi'
import { MdDelete, MdWarning } from 'react-icons/md'

function SubscriptionCard({ subscription, onEdit, onDelete }) {
  return (
    <div className="bg-white p-4 rounded-md shadow border border-blue-400 !font-poppins">
      <div className="flex justify-between items-center mb-3 !font-poppins">
        <h3 className="text-xl font-medium !font-poppins">
          {subscription.name}
        </h3>
        <div className="flex space-x-2">
          <Button
            type="text"
            icon={<FiEdit size={20} />}
            onClick={onEdit}
            className="text-blue-500 hover:text-blue-600"
          />
          <Popconfirm
            title={
              <div className="flex items-center gap-2 text-red-600 text-lg">
                <MdWarning className="text-xl" />
                Confirm Deletion
              </div>
            }
            description={
              <div className="text-sm text-gray-500">
                Are you sure you want to delete this subscription?
              </div>
            }
            icon={null}
            onConfirm={onDelete}
            okText="Yes, delete"
            cancelText="Cancel"
            okButtonProps={{ className: 'bg-red-600 hover:bg-red-700' }}
            cancelButtonProps={{ className: 'hover:text-blue-500' }}
            className="!font-poppins"
          >
            <Button
              type="text"
              icon={<MdDelete size={20} />}
              className="text-red-500 hover:text-red-600"
            />
          </Popconfirm>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4 !font-poppins">
        <div className="bg-blue-100 px-2 py-1 rounded-md">
          <p className="text-md text-gray-500 !font-poppins">Price</p>
          <p className="font-medium !font-poppins">${subscription.price}</p>
        </div>
        <div className="bg-green-100 px-2 py-1 rounded-md">
          <p className="text-md text-gray-500 !font-poppins">Validity</p>
          <p className="font-medium !font-poppins">{subscription.validity}</p>
        </div>
      </div>

      <div>
        <p className="text-sm text-gray-500 mb-2 !font-poppins">
          Feature list:
        </p>
        <ul className="space-y-1">
          {subscription.features.map((feature, index) => (
            <li
              key={index}
              className="flex items-center !font-poppins border p-4 border-blue-100"
            >
              <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
              <span className="text-sm !font-poppins">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default SubscriptionCard
