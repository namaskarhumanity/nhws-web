import { RiDeleteBin6Line } from "react-icons/ri";
import { BiSearch } from "react-icons/bi";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import LoadingButton from "../../utils/LoadingButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Layout from "./layout/Layout";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const AllUser = () => {
  const server = import.meta.env.VITE_SERVER;
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [usersData, setUsersData] = useState();
  const [search, setSearch] = useState("");
  const [userId, setUserId] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getAllUsers = async () => {
    try {
      if (search != "") {
        const res = await axios.get(
          `${server}/admin/get-users?search=${search}`,
          {
            headers: {
              Authorization: `${currentUser.data.accessToken}`,
            },
          }
        );
        setUsersData(res.data);
      } else {
        const res = await axios.get(`${server}/admin/get-users`, {
          headers: {
            Authorization: `${currentUser.data.accessToken}`,
          },
        });
        setUsersData(res.data);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleDelete = async (id) => {
    setDeleteLoading(true);
    setUserId(id);
    try {
      const res = await axios.delete(`${server}/admin/delete-user/${id}`, {
        headers: {
          Authorization: `${currentUser.data.accessToken}`,
        },
      });
      if (res.data.success) {
        toast.success(res.data.message);
      }
      setDeleteLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.message);
      setDeleteLoading(false);
    }
    setDeleteLoading(false);
  };

  const handleAdmin = async (id) => {
    const value = 1;
    handleClose();
    try {
      const res = await axios.put(
        `${server}/admin/change-privilage/${id}`,
        { value },
        {
          headers: {
            Authorization: `${currentUser.data.accessToken}`,
          },
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const handleUser = async (id) => {
    const value = 0;
    handleClose();
    try {
      const res = await axios.put(
        `${server}/admin/change-privilage/${id}`,
        { value },
        {
          headers: {
            Authorization: `${currentUser.data.accessToken}`,
          },
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, [search, page, deleteLoading]);

  return (
    <Layout>
      <div className="absolute sm:left-[30%] mt-4">
        <div className="relative  text-gray-500 focus-within:text-gray-900 mb-4">
          <div className="absolute inset-y-0 left-1 flex items-center pl-3 pointer-events-none ">
            <BiSearch />
          </div>
          <input
            type="text"
            id="default-search"
            className="block w-80 h-11 pr-5 pl-12 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search user"
          />
        </div>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>Avatar</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Admin</TableCell>
                  <TableCell>Verified</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {usersData?.data?.users
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow
                      key={row._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>
                        <Avatar alt="avatar" src={row?.avatar?.url} />
                      </TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.phone}</TableCell>
                      <TableCell>{row.is_admin === 1 ? "Yes" : "No"}</TableCell>
                      <TableCell>
                        {row.is_verified === 1 ? "Yes" : "No"}
                      </TableCell>
                      <TableCell>
                        {" "}
                        <div className="flex items-center gap-1">
                          <button className="p-2 rounded-full  group transition-all duration-500  flex item-center">
                            {deleteLoading && userId === row?._id ? (
                              <LoadingButton content={""} btnClass={""} />
                            ) : (
                              <RiDeleteBin6Line
                                color="red"
                                onClick={() => handleDelete(row?._id)}
                              />
                            )}
                          </button>
                          <div className="p-2  rounded-full  group transition-all duration-500  flex item-center">
                            <span
                              aria-controls={open ? "basic-menu" : undefined}
                              aria-haspopup="true"
                              aria-expanded={open ? "true" : undefined}
                              onClick={handleClick}
                            >
                              <BiDotsVerticalRounded color="blue" />
                            </span>
                            <Menu
                              id="basic-menu"
                              anchorEl={anchorEl}
                              open={open}
                              onClose={handleClose}
                              MenuListProps={{
                                "aria-labelledby": "basic-button",
                              }}
                            >
                              <MenuItem onClick={() => handleUser(row?._id)}>
                                Make User
                              </MenuItem>
                              <MenuItem onClick={() => handleAdmin(row?._id)}>
                                Make Admin
                              </MenuItem>
                            </Menu>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={usersData?.data?.users?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </Layout>
  );
};

export default AllUser;
