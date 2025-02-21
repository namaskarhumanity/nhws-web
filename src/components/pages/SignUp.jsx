import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Layout from "../../layout/Layout";
import LoadingButton from "../../utils/LoadingButton";
import { Button, Form, Input } from "antd";
import { Flex } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const server = import.meta.env.VITE_SERVER;
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const res = await axios.post(`${server}/auth/sign-up`, values, {
        headers: { "Content-Type": "application/json" },
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/sign-in");
      }
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <Layout>
      <div className="flex items-center justify-center px-4 mt-2 mb-4">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <h2 className="text-center text-xl font-bold leading-tight text-blue-900">
            Sign up to create account
          </h2>
          <div className="mt-2">
            <Form
              name="register"
              style={{
                maxWidth: 360,
              }}
              onFinish={handleSubmit}
            >
              <Form.Item
                name="name"
                rules={[
                  {
                    type: "text",
                    message: "The input is not valid text!",
                  },
                  {
                    required: true,
                    message: "Please input your Name!",
                  },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Name" />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid Email!",
                  },
                  {
                    required: true,
                    message: "Please input your Email!",
                  },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Email" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Password"
                />
              </Form.Item>

              <Form.Item
                name="confirm"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The new password that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="confirm password"
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
                    Register
                  </Button>
                )}
              </Form.Item>
              <Form.Item>
                <Flex justify="center" align="center">
                  <Form.Item>
                    <p>
                      {" "}
                      All ready have an account! &nbsp;
                      <Link to="/sign-in">Login In</Link>
                    </p>
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

export default SignUp;
