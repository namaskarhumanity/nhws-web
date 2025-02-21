import { useState } from "react";
import { PiUsersFill } from "react-icons/pi";
import { FaRupeeSign, FaUserCheck } from "react-icons/fa";
import { MdEmojiEvents } from "react-icons/md";
import { MdDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { LuAlignLeft } from "react-icons/lu";

const SideBar = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <div>
      <button
        type="button"
        className={`inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 ${
          toggle && "max-sm:hidden"
        }`}
        onClick={() => {
          setToggle(toggle == true ? false : true);
        }}
      >
        <LuAlignLeft />
      </button>
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full ${
          toggle == true ? "translate-x-0" : "sm:translate-x-0"
        }`}
        onClick={() => {
          setToggle(false);
        }}
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to="/dashboard"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <MdDashboard />
                <span className="ms-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/donations"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FaRupeeSign />
                <span className="flex-1 ms-3 whitespace-nowrap">Donations</span>
              </Link>
            </li>

            <li>
              <Link
                to="/users"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FaUser />
                <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
              </Link>
            </li>
            <li>
              <Link
                to="/volunteers"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FaUserCheck />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Volunteers
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/messages"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FaMessage />
                <span className="flex-1 ms-3 whitespace-nowrap">Inbox</span>
              </Link>
            </li>
            <li>
              <Link
                to="/manage-program"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <MdEmojiEvents />
                <span className="flex-1 ms-3 whitespace-nowrap">Program</span>
              </Link>
            </li>
            <li>
              <Link
                to="/manage-team"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <PiUsersFill />
                <span className="flex-1 ms-3 whitespace-nowrap">Team</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default SideBar;
