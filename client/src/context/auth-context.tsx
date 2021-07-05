import React, { useState, createContext } from "react";
import { Children } from "react";

type Props = {
  isAuth: boolean;
  setIsAuth: (el: any) => any;

  token: boolean;
  setToken: (el: any) => any;

  children?: React.ReactNode;
}

export const authContext = createContext<Props>({
  isAuth: false,
  setIsAuth: (el: any) => undefined,

  token: false,
  setToken: (el: any) => undefined

});

export function AuthProvider({
  isAuth,
  setIsAuth,
  token,
  setToken,
  children
}: Props) {

  return (
    <authContext.Provider
      value={{ isAuth, setIsAuth, token, setToken }}
    >
      {children}
    </authContext.Provider>
  )

}