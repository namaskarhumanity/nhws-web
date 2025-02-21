import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../../redux/slices/userSlice";
import axios from "axios";
import { toast } from "react-toastify";
import Layout from "../../layout/Layout";
import LoadingButton from "../../utils/LoadingButton";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Flex } from "antd";

const SignIn = () => {
  const server = import.meta.env.VITE_SERVER;
  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handelSubmit = async (values) => {
    if (!values.email || !values.password) {
      return dispatch(signInFailure("Please fill all the fields!"));
    }
    try {
      dispatch(signInStart());
      const res = await axios.post(`${server}/auth/sign-in`, values, {
        headers: { "Content-Type": "application/json" },
      });
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(signInSuccess(res.data));
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(signInFailure(error.response.data.message));
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center px-4 mt-4">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <h2 className="text-center text-xl font-bold leading-tight text-blue-900">
            Sign in to your account
          </h2>

          <div className="mt-2">
            <Form
              name="login"
              style={{
                maxWidth: 360,
              }}
              onFinish={handelSubmit}
            >
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your Username!",
                  },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Username" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                {loading ? (
                  <Button block className="bg-blue-900" type="primary">
                    <LoadingButton />
                  </Button>
                ) : (
                  <Button
                    block
                    htmlType="submit"
                    className="bg-blue-900"
                    type="primary"
                  >
                    Log In
                  </Button>
                )}
              </Form.Item>
              <Form.Item>
                <Flex justify="space-between" align="center">
                  <Form.Item>
                    <Link to="/forgot-password">Forgot password!</Link>
                  </Form.Item>
                  <Form.Item>
                    <Link to="/sign-up">Register here!</Link>
                  </Form.Item>
                </Flex>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SignIn;
