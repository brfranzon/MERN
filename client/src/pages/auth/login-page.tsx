import { useState } from "react";
import LoginForm from "../../components/auth/login/login-form"

const LoginPage = () => {

  const [unAuthorized, setunAuthorized] = useState(false);


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
        onUnauthorized={param => setunAuthorized(param)
        }
        onLogin={user => console.log(user)}
      />

      {unAuthorized &&
        <div>
          Nope...
        </div>
      }
    </div>
  </>;
}

export default LoginPage;