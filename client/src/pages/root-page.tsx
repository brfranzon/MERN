import { ROUTES } from "./routes"
import { BrowserRouter, Route, Switch, useHistory, Redirect } from "react-router-dom";
import LoginPage from "./auth/login-page";
import HubPage from "./hub/hub-page";

import { authContext } from "../context/auth-context";
import { useState } from "react";

export default function RootPage() {

  const [isAuth, setIsAuth] = useState(false);

  const [token, setToken] = useState(false);

  return (
    <>
      <BrowserRouter>
        <Switch>

          <authContext.Provider value={{ isAuth, setIsAuth, token, setToken }}>
            <Route path={`${ROUTES.login}`} exact>
              <LoginPage />
            </Route>

            <Route path={`${ROUTES.hub}`} exact>
              {isAuth && <HubPage />}
              {!isAuth && <Redirect to={ROUTES.login} />}
            </Route>

          </authContext.Provider>

          <Route path='*'>
            <div>NOT FOUND</div>
          </Route>

        </Switch>
      </BrowserRouter>
      <h2>token: {token ? 'true' : 'false'}</h2>
    </>
  );
}