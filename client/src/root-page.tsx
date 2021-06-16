import { ROUTES } from "./routes"
import { BrowserRouter, Redirect, Route, Switch, useHistory } from "react-router-dom";

import Login from '../src/pages/login';
import Hub from '../src/pages/hub';
import { useState } from "react";

export default function RootPage() {

  const [loginOK, setLoginOK] = useState(false);

  return (
    <BrowserRouter>
      <Switch>
        <Route path={`${ROUTES.login}`} exact>
          <Login isLoggedIn={(arg) => setLoginOK(true)} />
        </Route>
        {
          loginOK ?
            <Route path='/hub' exact>
              <Hub />
            </Route> :
            <h1> YOU need to make you loggin</h1>
        }
      </Switch>
    </BrowserRouter>
  );
}