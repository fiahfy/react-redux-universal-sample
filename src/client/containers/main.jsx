import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { asyncConnect } from 'redux-connect';
import { List, ListItem, TextField, IconButton } from 'material-ui';
import { NavigationClose } from 'material-ui/svg-icons';
import * as ActionCreators from '../actions';

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
  state = {
    text: '',
  };
  hancleTextChange(e) {
    this.setState({ text: e.target.value });
  }
  handleTextSubmit(e) {
    if (e.keyCode !== 13 || !e.target.value) {
      return;
    }
    this.props.createTodo({ text: e.target.value });
    this.setState({ text: '' });
  }
  handleDeleteClick(id) {
    this.props.deleteTodo({ id });
  }
  render() {
    const { todos } = this.props;

    const todoNodes = todos.map(todo => (
      <ListItem
        key={todo.id}
        primaryText={todo.text}
        rightIconButton={
          <IconButton
            onClick={() => this.handleDeleteClick(todo.id)}
          >
            <NavigationClose />
          </IconButton>
        }
      />
    ));

    return (
      <div>
        <TextField
          id="todo"
          value={this.state.text}
          hintText="Input..."
          fullWidth
          onChange={(e) => this.hancleTextChange(e)}
          onKeyDown={(e) => this.handleTextSubmit(e)}
        />
        <List>
          {todoNodes}
        </List>
      </div>
    );
  }
}
