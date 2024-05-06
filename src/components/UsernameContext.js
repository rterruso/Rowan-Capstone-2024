import { createContext } from 'react';

const UsernameContext = createContext({ username: '', setUsername: () => {} });

export default UsernameContext;