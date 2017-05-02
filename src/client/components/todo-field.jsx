import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField } from 'material-ui';

export default class TodoField extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
  };
  static defaultProps = {
    onSubmit: () => {},
  }
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
    this.props.onSubmit(e.target.value);
    this.setState({ text: '' });
  }
  render() {
    return (
      <TextField
        id="todo"
        value={this.state.text}
        hintText="Input..."
        fullWidth
        onChange={e => this.hancleTextChange(e)}
        onKeyDown={e => this.handleTextSubmit(e)}
      />
    );
  }
}
