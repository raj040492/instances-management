import React, { useContext } from 'react';

const AppContext = React.createContext(null);
export const useAppContext = () => useContext(AppContext);
export default AppContext;
