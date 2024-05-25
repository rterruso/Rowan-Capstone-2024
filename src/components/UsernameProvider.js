import UsernameContext from './UsernameContext.js';
import { useState } from 'react';
import PropTypes from 'prop-types';

function UsernameProvider({ children }) {
  const [username, setUsername] = useState(null);

  return (
    <UsernameContext.Provider value={{ username, setUsername }}>
      {children}
    </UsernameContext.Provider>
  );
}

UsernameProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default UsernameProvider;