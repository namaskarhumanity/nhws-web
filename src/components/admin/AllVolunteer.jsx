import { BiSearch } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingButton from "../../utils/LoadingButton";
import Layout from "./layout/Layout";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Avatar from "@mui/material/Avatar";

const AllVolunteer = () => {
  const server = import.meta.env.VITE_SERVER;
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [volunteerData, setVolunteerData] = useState();
  const [search, setSearch] = useState("");
  const [volunteerId, setVolunteerId] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getAllVolunteer = async () => {
    try {
      if (search !== "") {
        const res = await axios.get(
          `${server}/admin/get-volunteers?search=${search}`,
          {
            headers: {
              Authorization: `${currentUser.data.accessToken}`,
            },
          }
        );
        setVolunteerData(res.data);
      } else {
        const res = await axios.get(`${server}/admin/get-volunteers`, {
          headers: {
            Authorization: `${currentUser.data.accessToken}`,
          },
        });
        setVolunteerData(res.data);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const handleDelete = async (id) => {
    setDeleteLoading(true);
    setVolunteerId(id);
    try {
      const res = await axios.delete(`${server}/admin/delete-volunteer/${id}`, {
        headers: {
          Authorization: `${currentUser.data.accessToken}`,
        },
      });
      if (res.data.success) {
        toast.success(res.data.message);
      }
      setDeleteLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setDeleteLoading(false);
    }
    setDeleteLoading(false);
  };

  useEffect(() => {
    getAllVolunteer();
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
                  <TableCell>Gender</TableCell>
                  <TableCell>DOB</TableCell>
                  <TableCell>Father</TableCell>
                  <TableCell>Monther</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone </TableCell>
                  <TableCell>Qualification</TableCell>
                  <TableCell>Sills</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>State</TableCell>
                  <TableCell>City</TableCell>
                  <TableCell>Pincode</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {volunteerData?.data?.volunteer
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
                      <TableCell>{row.gender}</TableCell>
                      <TableCell>{row.dob}</TableCell>
                      <TableCell>{row.fname}</TableCell>
                      <TableCell>{row.mname}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.phone}</TableCell>
                      <TableCell>{row.qualification}</TableCell>
                      <TableCell>{row.skills}</TableCell>
                      <TableCell>{row.address}</TableCell>
                      <TableCell>{row.state}</TableCell>
                      <TableCell>{row.city}</TableCell>
                      <TableCell>{row.pincode}</TableCell>
                      <TableCell>
                        {" "}
                        <div className="flex items-center gap-1">
                          <button className="p-2 rounded-full  group transition-all duration-500  flex item-center">
                            {deleteLoading && volunteerId === row?._id ? (
                              <LoadingButton content={""} btnClass={""} />
                            ) : (
                              <RiDeleteBin6Line
                                color="red"
                                onClick={() => handleDelete(row?._id)}
                              />
                            )}
                          </button>
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
            count={volunteerData?.data?.volunteer?.length}
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

export default AllVolunteer;
