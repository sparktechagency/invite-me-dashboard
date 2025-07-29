import { Card, List, Button, message, Spin, Empty } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

import {
  useDeleteNotificationsMutation,
  useGetAllNotificationsQuery,
} from '../../Redux/notifications'

const Notifications = () => {
  const { data, isLoading, isError } = useGetAllNotificationsQuery()
  const [deleteNotification] = useDeleteNotificationsMutation()

  const handleDelete = async (id) => {
    try {
      await deleteNotification(id).unwrap()
      message.success('Notification deleted')
    } catch (error) {
      console.log(error)
      message.error('Failed to delete notification')
    }
  }

  if (isLoading) return <Spin className="flex justify-center my-10" />
  if (isError)
    return (
      <p className="text-center text-red-500">Failed to load notifications.</p>
    )

  const notifications = data?.data?.result || []

  return (
    <div className="max-w-3xl mx-auto my-10 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Notifications</h2>

      {notifications.length === 0 ? (
        <Empty description="No notifications found" />
      ) : (
        <List
          itemLayout="vertical"
          dataSource={notifications}
          renderItem={(notification) => (
            <Card
              key={notification._id}
              title={notification.title}
              extra={
                <Button
                  type="text"
                  icon={<DeleteOutlined />}
                  danger
                  onClick={() => handleDelete(notification._id)}
                />
              }
              className="mb-4 shadow-md"
            >
              <p>{notification.message}</p>
              {/* <p className="text-xs text-gray-500">
                {notification?.createdAt?.format('LLL')}
              </p> */}
            </Card>
          )}
        />
      )}
    </div>
  )
}

export default Notifications
