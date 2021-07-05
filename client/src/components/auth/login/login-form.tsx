import LoginFormFields from "./login-form-fields";
import { useContext, useState } from "react";
import { Button, Card, CardActions, CardContent, makeStyles, Typography } from '@material-ui/core'
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { getUser, userTokenVerified } from "../../../api/api";
import { authContext } from "../../../context/auth-context";
import { ROUTES } from "../../../pages/routes";
import { useHistory } from "react-router-dom";



type Props = {
  onUnauthorized?: (param: any) => any,
  onLogin?: (res?: any) => any
}

const LoginForm = ({ onUnauthorized, onLogin }: Props) => {

  const { isAuth, setIsAuth, token, setToken } = useContext(authContext);

  const history = useHistory();

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [userData, setUserData] = useState<any>([]);
  const [userToken, setUserToken] = useState<any>([]);

  useEffect(() => {
    getUser().
      then(res => (setUserData(res.data))).
      catch(err => console.log(err));
  }, []);

  useEffect(() => {
    userTokenVerified().
      then(res => setUserToken(res.data)).
      catch(err => console.log(err));
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const matchUser = userData?.filter(
      (el: any) => el.username === formData.username &&
        el.password === formData.password
    );

    const matchUserToken = userToken?.filter(
      (el: any) => el.token && el.userId === formData.username
    );

    console.log(matchUser, matchUserToken);

    if (matchUser.length > 0 && matchUserToken.length > 0) {
      //onUnauthorized(false)
      //onLogin();
      setIsAuth(true);
      setToken(true)
      console.log('my token generted!', matchUserToken.token)
      history.replace(ROUTES.hub);
      // return console.log('user found: ', matchUser);
    } else {
      return setIsAuth(false);
      ;
    }
  }

  return <div
    style={{
      border: '4px solid green',
      padding: 50,
      maxWidth: 900,
      minWidth: 900,
      height: 300

    }}
  >

    <form>

      <h1>Login Form</h1>
      <LoginFormFields inputValues={inputs => (console.log(inputs), setFormData(inputs))} />

      <Button
        color="secondary"
        onClick={handleSubmit}
      >
        Login
      </Button>

    </form>


  </div>

}

export default LoginForm;