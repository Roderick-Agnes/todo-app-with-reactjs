import { register } from "features/Auth/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import RegisterForm from "../RegisterForm";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";

Register.propTypes = {
  onClose: PropTypes.func,
  changeMode: PropTypes.func,
};

function Register(props) {
  const { onClose, changeMode } = props;
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleRegisterFormSubmit = async (values) => {
    try {
      // auto set username = email
      values.username = values.email;

      // get register action from userslice and set payload value
      const action = register(values);

      // call register action with data
      const resultAction = await dispatch(action);

      // get response from action
      const data = unwrapResult(resultAction);

      // do something here

      // close dialog
      if (onClose) {
        onClose();
      }

      // show message
      enqueueSnackbar("Register successful", { variant: "success" });
      console.log("new user: ", data);
    } catch (error) {
      console.log(error);
      // show message
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };
  return (
    <div>
      <RegisterForm
        onSubmit={handleRegisterFormSubmit}
        changeMode={changeMode}
      />
    </div>
  );
}

export default Register;
