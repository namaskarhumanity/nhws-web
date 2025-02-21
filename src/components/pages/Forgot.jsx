import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "../../layout/Layout";
import LoadingButton from "../../utils/LoadingButton";
import { Button, Input } from "antd";
import { Flex } from "antd";
import { Form } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { CiCircleCheck } from "react-icons/ci";

const Forgot = () => {
  const server = import.meta.env.VITE_SERVER;
  const [otpLoading, setOtpLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const navigate = useNavigate();

  const handleGenrate = async (values) => {
    setOtpLoading(true);
    try {
      const res = await axios.post(`${server}/auth/send-otp`, values);
      if (res.data.success) {
        toast.success(res.data?.message);
      }
      setOtpLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.message);
      setOtpLoading(false);
    }
    setOtpLoading(false);
  };

  const handleForgot = async (values) => {
    setResetLoading(true);
    try {
      const res = await axios.post(`${server}/auth/forgot-password`, values);
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/sign-in");
      }
      setResetLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setResetLoading(false);
    }
    setResetLoading(false);
  };

  return (
    <Layout
      title={"Namaskar Humanity Welfare Society -Contact"}
      description={
        "We would love to hear from you at Namaskar Humanity Welfare Society!"
      }
      keywords={"help, educate, donate, welfare society"}
    >
      <div className="flex items-center justify-center px-4 mt-4 mb-6">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <h2 className="text-center text-xl font-bold leading-tight text-blue-900">
            Forgot your password
          </h2>
          <div className="mt-2">
            <Form
              name="genrate otp"
              style={{
                maxWidth: 360,
              }}
              onFinish={handleGenrate}
            >
              <Flex justify="space-between">
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
                <Form.Item>
                  {otpLoading ? (
                    <Button block className="bg-blue-900" type="primary">
                      <LoadingButton content={"Loading..."} />
                    </Button>
                  ) : (
                    <Button
                      block
                      htmlType="submit"
                      className="bg-blue-900"
                      type="primary"
                    >
                      Genrate otp
                    </Button>
                  )}
                </Form.Item>
              </Flex>
            </Form>
          </div>
          <div>
            <Form
              name="reset"
              style={{
                maxWidth: 360,
              }}
              onFinish={handleForgot}
            >
              <Form.Item
                name="otp"
                rules={[
                  {
                    required: true,
                    message: "Please input your otp!",
                  },
                ]}
                hasFeedback
              >
                <Input prefix={<CiCircleCheck size={17} />} placeholder="OTP" />
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
                {resetLoading ? (
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
                    Reset
                  </Button>
                )}
              </Form.Item>
              <Form.Item>
                <Flex justify="center" align="center">
                  <Form.Item>
                    <p>
                      {" "}
                      If you remember password! &nbsp;
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

export default Forgot;
