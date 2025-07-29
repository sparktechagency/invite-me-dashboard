import { Button, Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'
import forget_password_img from '../../assets/auth_img/forget_password_img.png'
import { useForgetPasswordMutation } from '../../Redux/authApis'
import toast from 'react-hot-toast'

const ForgetPassword = () => {
  const navigate = useNavigate()

  const [postResendOtp, { isLoading }] = useForgetPasswordMutation()

  const [form] = Form.useForm()
  const onFinish = async (values) => {
    try {
      await postResendOtp({
        email: values.email,
      })
        .unwrap()
        .then((res) => {
          toast.success(res?.message)
          form.resetFields()
          localStorage.removeItem('email')
          localStorage.setItem('email', values.email)
          navigate('/verify-code')
        })
    } catch (error) {
      toast.error(error?.data?.message)
    }
  }

  return (
    <div className="h-screen flex responsive-base-width">
      <div className="w-1/2 flex flex-col items-center justify-center bg-white">
        <div className="mt-5  text-gray-500 text-[18px] text-center leading-8">
          <img src={forget_password_img} alt="forgot-password" />
        </div>
      </div>
      <div className="w-1/2 bg-white flex flex-col justify-center items-center p-12">
        <h1 className="text-3xl font-bold mb-2">Forget password</h1>
        <p className="text-lg text-gray-700 mb-8 text-center">
          Enter your email address to ger a verification code for resetting your
          password.
        </p>

        <Form layout="vertical" onFinish={onFinish} className="w-full max-w-sm">
          <label htmlFor="email" className="text-gray-500 text-[16px] ">
            Email
          </label>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please enter your  email!',
              },
              {
                type: 'email',
                message: 'Please enter a valid email!',
              },
            ]}
            className="mt-1"
          >
            <Input
              placeholder="Enter  Email"
              className="h-[42px] px-4 border-gray-300 rounded-md"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-[#11CD95] hover:!bg-[#26be91]  transition-all text-white  h-[42px] rounded-md"
            >
              {isLoading ? 'Loading...' : ' Get OTP'}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default ForgetPassword
