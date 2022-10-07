import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "components/form-control/InputField";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import * as yup from "yup";

TodoForm.propTypes = {
  onSubmit: PropTypes.func,
};

function TodoForm(props) {
  const { onSubmit } = props;
  const schema = yup
    .object({
      title: yup
        .string()
        .required("Please enter a title")
        .min(5, "Title is too short"),
    })
    .required();

  const form = useForm({
    defaultValues: {
      title: "",
    },
    resolver: yupResolver(schema),
  });
  const handleSubmit = (values) => {
    // console.log("TodoForm submit: ", values);
    if (onSubmit) {
      onSubmit(values);
    }
    form.reset();
  };
  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      Todo name: <InputField name="title" label="todo" form={form} />
    </form>
  );
}

export default TodoForm;
