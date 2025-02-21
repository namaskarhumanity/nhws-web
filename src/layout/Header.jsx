import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { blue } from "@mui/material/colors";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { signoutSuccess } from "../redux/slices/userSlice";
import { LuLogOut } from "react-icons/lu";
import { MdDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";

const blue900 = blue[900];
const pages = [
  { id: 1, name: "Home", path: "/" },
  { id: 2, name: "Program", path: "/program" },
  { id: 3, name: "Certificate", path: "/certificates" },
  { id: 4, name: "About", path: "/about" },
  { id: 5, name: "Contact", path: "/contact" },
];

function Header() {
  const server = import.meta.env.VITE_SERVER;
  const { currentUser } = useSelector((state) => state.user);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const dispatch = useDispatch();

  const handleSignout = async () => {
    try {
      const res = await fetch(`${server}/auth/logout`, {
        method: "POST",
        headers: { Authorization: `${currentUser?.data?.accessToken}` },
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
      } else {
        toast.success(data.message);
        dispatch(signoutSuccess());
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <AppBar position="static" sx={{ bgcolor: blue900 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            NHWS
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.id} onClick={handleCloseNavMenu}>
                  <Link to={page.path}>
                    <Typography sx={{ textAlign: "center" }}>
                      {page.name}
                    </Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            NHWS
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Link key={page.id} to={page.path}>
                <Button
                  key={page.id}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.name}
                </Button>
              </Link>
            ))}
          </Box>
          {currentUser ? (
            <Box sx={{ flexGrow: 0 }}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="avatar"
                  src={currentUser?.data?.user?.avatar?.url}
                />
              </IconButton>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <FaUser size={20} />
                  <Link to={"/account"}>
                    <Typography sx={{ textAlign: "center", marginLeft: "2px" }}>
                      My Profile
                    </Typography>
                  </Link>
                </MenuItem>
                {currentUser?.data?.user?.is_admin ? (
                  <MenuItem>
                    <MdDashboard size={20} />
                    <Link to="/dashboard">
                      <Typography
                        sx={{ textAlign: "center", marginLeft: "2px" }}
                      >
                        Dashboard
                      </Typography>
                    </Link>
                  </MenuItem>
                ) : (
                  ""
                )}
                <hr className="my-1 border-blue-gray-50" />
                <MenuItem>
                  <LuLogOut size={20} color="red" />
                  <Typography
                    onClick={handleSignout}
                    sx={{
                      textAlign: "center",
                      marginLeft: "2px",
                      color: "red",
                    }}
                  >
                    Loug out
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Link to={"/sign-in"}>
              <Typography sx={{ textAlign: "center" }}>SIGN IN</Typography>
            </Link>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
