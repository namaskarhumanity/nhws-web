import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Layout from "./layout/Layout";
import { BiSearch } from "react-icons/bi";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const columns = [
  { id: "name", label: "Name", minWidth: 300 },
  { id: "email", label: "Email", minWidth: 300 },
  {
    id: "phone",
    label: "Phone",
    minWidth: 170,
  },
  {
    id: "pancard",
    label: "Pancard",
    minWidth: 170,
  },
  {
    id: "address",
    label: "Address",
    minWidth: 300,
  },
  {
    id: "purpose",
    label: "Purpose",
    minWidth: 300,
  },
  {
    id: "amount",
    label: "Amount",
    minWidth: 100,
  },
];

export default function Donations() {
  const server = import.meta.env.VITE_SERVER;
  const { currentUser } = useSelector((state) => state.user);
  const [donations, setDonations] = useState();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getAllDonations = async () => {
    try {
      if (search != "") {
        const res = await axios.get(
          `${server}/admin/get-payments?search=${search}`,
          {
            headers: {
              Authorization: `${currentUser.data.accessToken}`,
            },
          }
        );
        setDonations(res.data);
      } else {
        const res = await axios.get(`${server}/admin/get-payments`, {
          headers: {
            Authorization: `${currentUser.data.accessToken}`,
          },
        });
        setDonations(res.data);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    getAllDonations();
  }, [search, page]);

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
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {donations?.data?.payments
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row._id}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={donations?.data?.payments?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </Layout>
  );
}
