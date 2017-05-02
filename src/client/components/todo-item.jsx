import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, IconButton } from 'material-ui';
import { NavigationClose } from 'material-ui/svg-icons';

const TodoItem = ({ id, text, onClickDeleteButton }) => (
  <ListItem
    key={id}
    primaryText={text}
    rightIconButton={
      <IconButton
        onClick={() => onClickDeleteButton(id)}
      >
        <NavigationClose />
      </IconButton>
    }
  />
);

TodoItem.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  onClickDeleteButton: PropTypes.func.isRequired,
};

export default TodoItem;
