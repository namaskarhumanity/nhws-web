import { useState } from "react";
import axios from "axios";
import getInTouch from "../../../src/assets/wallpaper/get-in-touch.jpg";
import { toast } from "react-toastify";
import Layout from "../../layout/Layout";
import LoadingButton from "../../utils/LoadingButton";

const Contact = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const server = import.meta.env.VITE_SERVER;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await axios.post(`${server}/message/send`, formData, {
        headers: { "Content-Type": "application/json" },
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <Layout
      title={"Namaskar Humanity Welfare Society -Contact"}
      description={
        "We would love to hear from you at Namaskar Humanity Welfare Society ! Whether you have questions, ideas, or want to join our mission of bringing positive change, your voice matters to us. Share your thoughts, Collaborate with us on projects, Volunteer or support our causes. Together, we can make a real difference in the lives of those who need it most. Let’s create a brighter future, one conversation at a time!"
      }
      keywords={"help, educate, donate, welfare society"}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col space-y-2 pb-2 pt-6 md:pt-12">
          <div className="mx-auto max-w-max rounded-full border bg-gray-50 p-1 px-3">
            <p className="text-center text-xs font-semibold leading-normal md:text-sm">
              Share your thoughts
            </p>
          </div>
          <p className="text-center text-3xl font-bold text-blue-900 md:text-5xl md:leading-10">
            Love to hear from you
          </p>
          <p className="mx-auto w-full text-center text-base text-gray-600 md:text-xl">
            We would love to hear from you at Namaskar Humanity Welfare Society
            ! Whether you have questions, ideas, or want to join our mission of
            bringing positive change, your voice matters to us. Share your
            thoughts, Collaborate with us on projects, Volunteer or support our
            causes. Together, we can make a real difference in the lives of
            those who need it most. Let’s create a brighter future, one
            conversation at a time!
          </p>
        </div>
        <div className="mx-auto max-w-7xl py-2 md:py-4">
          <div className="grid items-center justify-items-center gap-x-4 gap-y-10 lg:grid-cols-2">
            <div className="flex items-center justify-center">
              <div className="px-2 md:px-12">
                <p className="text-2xl font-bold text-blue-900 md:text-4xl">
                  Get in touch
                </p>
                <p className="mt-4 text-lg text-gray-900">
                  Feel free to drop us a message anytime. We look forward to
                  hearing from you and working together for the greater good!
                </p>
                <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                  <div className="grid w-full gap-y-4 md:gap-x-4 lg:grid-cols-2"></div>
                  <div className="grid w-full  items-center gap-1.5">
                    <label
                      className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor="name"
                    >
                      Name
                    </label>
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                      type="text"
                      id="name"
                      onChange={handleChange}
                      placeholder="Name"
                    />
                  </div>
                  <div className="grid w-full  items-center gap-1.5">
                    <label
                      className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                      onChange={handleChange}
                      type="text"
                      id="email"
                      placeholder="email"
                    />
                  </div>
                  <div className="grid w-full  items-center gap-1.5">
                    <label
                      className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor="phone"
                    >
                      Phone number
                    </label>
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                      type="tel"
                      id="phone"
                      onChange={handleChange}
                      placeholder="Phone number"
                    />
                  </div>
                  <div className="grid w-full  items-center gap-1.5">
                    <label
                      className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor="message"
                    >
                      Message
                    </label>
                    <textarea
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                      id="message"
                      onChange={handleChange}
                      placeholder="Leave us a message"
                      cols={3}
                    />
                  </div>
                  {loading ? (
                    <LoadingButton
                      content={"Sending..."}
                      btnClass={
                        "w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                      }
                    />
                  ) : (
                    <button
                      type="submit"
                      className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      Send Message
                    </button>
                  )}
                </form>
              </div>
            </div>
            <img
              alt="Contact us"
              className="hidden max-h-[60%] w-full rounded-lg object-cover lg:block"
              src={getInTouch}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
