import { Form, Input, Button } from 'antd'
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import toast from 'react-hot-toast'
import { FiLoader } from 'react-icons/fi'
import { useChangePasswordMutation } from '../../Redux/authApis'

const Password = () => {
  const [form] = Form.useForm()

  const [changePassword, { isLoading }] = useChangePasswordMutation()

  const handleCancelClick = () => {
    form.resetFields()
  }

  const handleSaveClick = async (values) => {
    try {
      const response = await changePassword({
        oldPassword: values.old_password,
        newPassword: values.password,
        confirmNewPassword: values.confirm_password,
      }).unwrap()
      console.log(response)
      localStorage.removeItem('token')
      localStorage.setItem('token', response?.data?.accessToken)
      toast.success(response.message)
      form.resetFields()
    } catch (error) {
      toast.error(error.data?.message || 'Failed to update password.')
    }
  }

  return (
    <div className="flex flex-col items-center ">
      <div className="rounded-lg  w-full ">
        <Form
          form={form}
          layout="vertical"
          requiredMark={false}
          onFinish={handleSaveClick}
        >
          <Form.Item
            label="Current Password"
            name="old_password"
            rules={[
              {
                required: true,
                message: 'Please enter your current password',
              },
            ]}
          >
            <Input.Password
              placeholder="*************"
              iconRender={(visible) =>
                visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
              }
              className="h-[42px]"
            />
          </Form.Item>

          <Form.Item
            label="New Password"
            name="password"
            rules={[
              { required: true, message: 'Please enter your new password' },
            ]}
          >
            <Input.Password
              placeholder="*************"
              iconRender={(visible) =>
                visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
              }
              className="h-[42px]"
            />
          </Form.Item>

          <Form.Item
            label="Confirm New Password"
            name="confirm_password"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('Passwords do not match!'))
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="*************"
              iconRender={(visible) =>
                visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
              }
              className="h-[42px]"
            />
          </Form.Item>

          <div className="flex items-center justify-center gap-1.5">
            <Button type="primary" disabled={isLoading} htmlType="submit">
              {isLoading ? (
                <div className="flex items-center gap-2">
                  Loading...
                  <FiLoader />
                </div>
              ) : (
                'Save'
              )}
            </Button>
            <Button onClick={handleCancelClick}>Cancel</Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default Password
