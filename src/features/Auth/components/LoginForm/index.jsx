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

LoginForm.propTypes = {
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
function LoginForm(props) {
  YupPassword(yup); // extend yup
  const classes = useStyles();
  const { onSubmit, changeMode } = props;
  const schema = yup
    .object({
      identifier: yup
        .string()
        .required("Please enter your email address")
        .email("Please enter a valid email address"),
      password: yup.string().password(),
    })
    .required();

  const form = useForm({
    defaultValues: {
      identifier: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });
  const handleSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
    }
    // form.reset();
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
          Sign in
        </Typography>
        <form
          className={classes.form}
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputField name="identifier" label="Email" form={form} />
            </Grid>
            <Grid item xs={12}>
              <PasswordField name="password" label="Password" form={form} />
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
            Sign in
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button
                color="primary"
                onClick={() => {
                  changeMode();
                }}
              >
                Don't have an account. Sign up now
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default LoginForm;
