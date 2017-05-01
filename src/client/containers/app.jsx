import React, { PropTypes } from 'react';
import { AppBar } from 'material-ui';

const App = ({ children }) => (
  <div>
    <AppBar
      title="React Redux Universal Sample"
      showMenuIconButton={false}
    />
    {children}
  </div>
);

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
