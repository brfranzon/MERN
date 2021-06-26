import { ROUTES } from "./routes"
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import LoginPage from "./auth/login-page";


export default function RootPage() {

 return (
    <BrowserRouter>
      <Switch>

        <Route path={`${ROUTES.login}`} exact>
          <LoginPage />
        </Route>

      </Switch>
    </BrowserRouter>
  );
}