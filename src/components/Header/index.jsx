import {
  DialogActions,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { AccountCircle } from "@material-ui/icons";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MenuIcon from "@material-ui/icons/Menu";
import Login from "features/Auth/components/Login";
import Register from "features/Auth/components/Register";
import { logout } from "features/Auth/userSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: "none",
    color: "#fff",
  },
}));
const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const MODE = {
  LOGIN: "login",
  REGISTER: "register",
};
export default function Header() {
  const dispatch = useDispatch();
  // register form dialog
  const [open, setOpen] = useState(false);
  // mode state
  const [mode, setMode] = useState(MODE.LOGIN);

  const userInfo = useSelector((state) => state.user.current);

  const isUserLoggedIn = !!userInfo.id;

  const handleClickOpen = () => {
    setOpen(true);
  };

  // app bar header
  const handleClose = () => {
    setOpen(false);
  };

  const toggleLoginForm = () => {
    setMode(MODE.LOGIN);
  };
  const toggleRegisterForm = () => {
    setMode(MODE.REGISTER);
  };

  const classes = useStyles();

  // setting menu
  const [anchorEl, setAnchorEl] = useState(null);

  const handleUserIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    dispatch(logout());
    handleCloseMenu();
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Link className={classes.link} to="/">
              TODO APP
            </Link>
          </Typography>

          {isUserLoggedIn === false ? (
            <NavLink to="/login" className={classes.link}>
              <Button color="inherit" onClick={handleClickOpen}>
                Login
              </Button>
            </NavLink>
          ) : (
            <IconButton color="inherit" onClick={handleUserIconClick}>
              <AccountCircle />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogActions>
          <CancelPresentationIcon onClick={handleClose} color="secondary" />
          {/* <Button onClick={handleClose} color="primary">
        Submit
      </Button> */}
        </DialogActions>
        {/* <DialogTitle id="form-dialog-title">Subscribe</DialogTitle> */}
        <DialogContent>
          {mode === MODE.REGISTER && (
            <>
              <Register onClose={handleClose} changeMode={toggleLoginForm} />
            </>
          )}
          {mode === MODE.LOGIN && (
            <>
              <Login onClose={handleClose} changeMode={toggleRegisterForm} />
            </>
          )}
        </DialogContent>
      </Dialog>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
          <ListItemIcon>
            <AccountBoxIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="My account" />
        </StyledMenuItem>
        <StyledMenuItem onClick={handleLogout}>
          <ListItemIcon>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}
