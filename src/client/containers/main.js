import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {asyncConnect} from 'redux-connect'
import {List, ListItem, TextField, IconButton} from 'material-ui'
import {NavigationClose} from 'material-ui/svg-icons'
import * as ActionCreators from '../actions'

function mapStateToProps(state) {
  return {todos: state.todos}
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(ActionCreators, dispatch)}
}

@asyncConnect([{
  deferred: true,
  promise: ({store: {dispatch}}) => {
    return ActionCreators.fetchTodos()(dispatch)
  }
}])
@connect(mapStateToProps, mapDispatchToProps)
export default class Main extends Component {
  static propTypes = {
    todos:   PropTypes.arrayOf(PropTypes.object),
    actions: PropTypes.object
  };
  state = {
    text: ''
  };
  hancleTextChange(e) {
    this.setState({text: e.target.value})
  }
  handleTextSubmit(e) {
    if (e.keyCode != 13 || !e.target.value) {
      return
    }
    this.props.actions.createTodo({text: e.target.value})
    this.setState({text: ''})
  }
  handleDeleteClick(id) {
    this.props.actions.deleteTodo({id})
  }
  render() {
    const {todos} = this.props

    const todoNodes = todos.map((todo, index) => {
      return (
        <ListItem key={index} primaryText={todo.text} rightIconButton={
          <IconButton onClick={() => this.handleDeleteClick(todo.id)}>
            <NavigationClose />
          </IconButton>
        }
        />
      )
    })

    return (
      <div>
        <TextField id="todo" value={this.state.text} hintText="Input..."
          fullWidth={true}
          onChange={::this.hancleTextChange}
          onKeyDown={::this.handleTextSubmit}
        />
        <List>
          {todoNodes}
        </List>
      </div>
    )
  }
}
