import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import LoginForm from "../../components/auth/login/login-form"
import { authContext } from "../../context/auth-context";
import { ROUTES } from "../routes";

const LoginPage = () => {

  const [unAuthorized, setunAuthorized] = useState(false);
  const history = useHistory();

  const { isAuth, setIsAuth } = useContext(authContext);


  return <>
    <div style={{
      border: '10px solid magenta',
      padding: 30,
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h1 style={{ color: 'magenta', position: 'absolute', top: 0 }}> Login Page</h1>

      <LoginForm
        // onUnauthorized={param => setunAuthorized(param)}
        // onLogin={() => history.replace(ROUTES.hub)}
      />

    </div>
  </>;
}

export default LoginPage;