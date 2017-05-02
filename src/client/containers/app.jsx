import React from 'react';
import PropTypes from 'prop-types';
import { AppBar } from 'material-ui';

const App = ({ children }) => (
  <div>
    <AppBar
      title="Todo Sample"
      showMenuIconButton={false}
    />
    {children}
  </div>
);

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
