import { Form, Input, Button, Checkbox } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

import login_img from '../../assets/auth_img/login_img.png'
import { useLoginMutation } from '../../Redux/authApis'

const Login = () => {
  const navigate = useNavigate()

  const [form] = Form.useForm()

  const [postSignIn, { isLoading }] = useLoginMutation()

  const onFinish = async (values) => {
    try {
      await postSignIn({
        email: values.email,
        password: values.password,
      })
        .unwrap()
        .then((res) => {
          toast.success(res?.message)
          form.resetFields()
          localStorage.setItem('token', res?.data?.accessToken)
          localStorage.setItem('role', res?.data?.role)
          navigate('/')
        })
    } catch (error) {
      console.log(error)
      toast.error(error?.data?.message)
    }
  }

  return (
    <div className="h-screen flex responsive-base-width gap-5">
      <div className="w-1/2 flex flex-col items-center justify-center bg-white">
        {/* <img src={login} alt="Login" className="w-full h-full object-cover" /> */}
        <div className="text-4xl text-[#11CD95] font-bold">
          Welcome to Innviteme
        </div>
        <div className="mt-5  text-gray-500 text-[18px] text-center leading-8">
          <img src={login_img} alt="login" />
        </div>
      </div>

      <div className="w-1/2 bg-white flex flex-col justify-center items-center p-12">
        <h1 className="text-3xl font-bold mb-2">Login to Account!</h1>
        <p className="text-lg text-gray-700 mb-8 text-center">
          Please enter your email and password to continue.
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
                message: 'Please enter your username or email!',
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

          <label htmlFor="password" className="text-gray-500 text-[16px] ">
            Password
          </label>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please enter your password!' }]}
          >
            <Input.Password
              placeholder="Enter password"
              className="h-[42px] px-4 border-gray-300 rounded-md mt-1"
            />
          </Form.Item>

          <Form.Item>
            <Checkbox className="text-gray-700">Remember Password</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-[#11CD95] hover:!bg-[#26be91] text-white h-[42px] rounded-md"
            >
              {isLoading ? 'Loading...' : 'Log in'}
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center">
          <Link
            to={`/forget-password`}
            className="text-red-500 hover:text-[#11CD95] transition-all underline underline-offset-2  text-sm"
          >
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
