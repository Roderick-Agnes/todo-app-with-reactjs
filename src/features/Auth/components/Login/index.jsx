import { unwrapResult } from "@reduxjs/toolkit";
import { login } from "features/Auth/userSlice";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import LoginForm from "../LoginForm";

Login.propTypes = {
  onClose: PropTypes.func,
  changeMode: PropTypes.func,
};

function Login(props) {
  const { onClose, changeMode } = props;
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleFormSubmit = async (values) => {
    try {
      // get register action from userslice and set payload value
      const action = login(values);

      // call register action with dispatch
      const resultAction = await dispatch(action);

      // get response from action
      const data = unwrapResult(resultAction);

      // do something here

      // close dialog
      if (onClose) {
        onClose();
      }

      // show message
      // enqueueSnackbar("Register successful", { variant: "success" });
      console.log("new user: ", data);
    } catch (error) {
      console.log(error);
      // show message
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };
  return (
    <div>
      <LoginForm onSubmit={handleFormSubmit} changeMode={changeMode} />
    </div>
  );
}

export default Login;
