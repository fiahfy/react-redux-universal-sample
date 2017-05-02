import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { asyncConnect } from 'redux-connect';
import * as ActionCreators from '../actions';
import TodoField from '../components/todo-field';
import TodoList from '../components/todo-list';

function mapStateToProps(state) {
  return { todos: state.todos };
}

function mapDispatchToProps(dispatch) {
  return { ...bindActionCreators(ActionCreators, dispatch) };
}

@asyncConnect([{
  deferred: true,
  promise: ({ store: { dispatch } }) => ActionCreators.fetchTodos()(dispatch),
}])
@connect(mapStateToProps, mapDispatchToProps)
export default class Main extends Component {
  static propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object).isRequired,
    createTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
  };
  handleTodoDelete(id) {
    this.props.deleteTodo({ id });
  }
  handleTodoSubmit(text) {
    this.props.createTodo({ text });
  }
  render() {
    const { todos } = this.props;
    return (
      <div>
        <TodoField onSubmit={text => this.handleTodoSubmit(text)} />
        <TodoList todos={todos} onClickDeleteButton={id => this.handleTodoDelete(id)} />
      </div>
    );
  }
}
