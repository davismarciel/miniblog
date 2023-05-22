import { useContext, createContext } from 'react';

const AuthContent = createContext();

export const AuthProvider = ({ children, value }) => {
  return <AuthContent.Provider value={value}>{children}</AuthContent.Provider>;
};

export const useAuthValue = () => {
  return useContext(AuthContent);
};
