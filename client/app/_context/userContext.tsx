"use client"

import React, { createContext, useState, useContext, FC, ReactNode, useEffect } from 'react';
import { Auth } from '../(auth)/authorization';

export type User = {
  username: string;
  email:string;
  imgUrl:string;
}

type AuthContextProps = {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  tryFetch: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  login: async () => {},
  logout: () => {},
  tryFetch: async () => {},
});

const AuthProvider = ({ children }: {children : ReactNode}) => {


  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    try {
      const response:any = await Auth();
      if(response.status == 200){
        setUser(response.data);
      }
      return;
    }
    catch(error)
    {
      logout();
    }
  }

  const login = async (token:string) => {
    localStorage.setItem('authToken',JSON.stringify(token));
    await fetchUser();
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  const tryFetch = async () => {
    await fetchUser();
  }

  useEffect(()=>{
    setInterval(()=>{
      fetchUser();
    },120000)
  },[])
 

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        tryFetch
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextProps => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };