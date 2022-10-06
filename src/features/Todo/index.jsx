import React from "react";
import PropTypes from "prop-types";
import TodoList from "../Todo/components/TodoList";
import TodoForm from "./components/TodoForm";

Todo.propTypes = {};

function Todo(props) {
  const handleTodoFormSubmit = (values) => {
    console.log("Todo submit: ", values);
  };
  return (
    <div>
      <TodoForm onSubmit={handleTodoFormSubmit} />
      <TodoList />
    </div>
  );
}

export default Todo;
