import { yupResolver } from "@hookform/resolvers/yup";

import { LinearProgress } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import InputField from "components/FormControl/InputField";
import PasswordField from "components/FormControl/PasswordField";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import YupPassword from "yup-password";

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
  changeMode: PropTypes.func,
};
const useStyles = makeStyles((theme) => ({
  paper: {
    // marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    // marginTop: theme.spacing(3),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
function RegisterForm(props) {
  YupPassword(yup); // extend yup
  const classes = useStyles();
  const { onSubmit, changeMode } = props;
  const schema = yup
    .object({
      fullname: yup.string().required("Please enter a fullname"),
      email: yup
        .string()
        .required("Please enter your email address")
        .email("Please enter a valid email address"),
      password: yup.string().password(),
      retypePassword: yup
        .string()
        .required("Please enter your password")
        .oneOf([yup.ref("password")], "Password does not match"),
    })
    .required();

  const form = useForm({
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      retypePassword: "",
    },
    resolver: yupResolver(schema),
  });
  const handleSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
    }
    form.reset();
  };
  const { isSubmitting } = form.formState;
  return (
    <Container component="main" maxWidth="xs">
      {isSubmitting && <LinearProgress />}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create new account
        </Typography>
        <form
          className={classes.form}
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputField name="fullname" label="Full Name" form={form} />
            </Grid>

            <Grid item xs={12}>
              <InputField name="email" label="Email" form={form} />
            </Grid>
            <Grid item xs={12}>
              <PasswordField name="password" label="Password" form={form} />
            </Grid>
            <Grid item xs={12}>
              <PasswordField
                name="retypePassword"
                label="Comfirm Password"
                form={form}
              />
            </Grid>
          </Grid>
          <Button
            disabled={isSubmitting}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button
                color="primary"
                onClick={() => {
                  changeMode();
                }}
              >
                Already have an account? Login now
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default RegisterForm;
