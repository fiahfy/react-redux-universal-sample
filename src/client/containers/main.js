import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {asyncConnect} from 'redux-async-connect'
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
  handleSubmit(e) {
    e.preventDefault()
    this.props.actions.createTodo({text: this.refs.text.value})
    this.refs.text.value = ''
  }
  handleClickDeleteButton(id) {
    this.props.actions.deleteTodo({id})
  }
  render() {
    const {todos} = this.props

    const todoNodes = todos.map((todo, index) => {
      return (
        <div key={index}>
          {todo.text}
          <input type="button" value="x" onClick={() => this.handleClickDeleteButton(todo.id)} />
        </div>
      )
    })

    return (
      <div>
        <div>
          <form onSubmit={::this.handleSubmit} action="/">
            <input type="text" ref="text" />
          </form>
        </div>
        <div>
          {todoNodes}
        </div>
      </div>
    )
  }
}
