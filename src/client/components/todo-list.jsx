import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'material-ui';
import TodoItem from '../components/todo-item';

const TodoList = ({ todos, onClickDeleteButton }) => {
  const items = todos.map(todo => (
    <TodoItem
      key={todo.id}
      id={todo.id}
      text={todo.text}
      onClickDeleteButton={onClickDeleteButton}
    />
  ));
  return (
    <List>
      {items}
    </List>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClickDeleteButton: PropTypes.func.isRequired,
};

export default TodoList;
