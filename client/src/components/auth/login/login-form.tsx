import LoginFormFields from "./login-form-fields";
import { useState } from "react";
import { Button, Card, CardActions, CardContent, makeStyles, Typography } from '@material-ui/core'
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { getUser, userTokenVerified } from "../../../api/api";

type Props = {
  onUnauthorized: (param: any) => any,
  onLogin: (res: any) => any
}

const LoginForm = ({ onUnauthorized, onLogin }: Props) => {

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
    // console.log('user data: ', userData);
    // console.log('userToken: ', userToken);
    // console.log('formData: ', formData);

    const matchUser = userData?.filter(
      (el: any) => el.username === formData.username &&
        el.password === formData.password
    );

    const matchUserToken = userToken?.filter(
      (el: any) => el.token && el.userId === formData.username
    );

    console.log(matchUser, matchUserToken);

    if (matchUser.length > 0 && matchUserToken.length > 0) {
      onUnauthorized(false)
      onLogin(matchUser);
      return console.log('user found: ', matchUser);
    } else {
      return onUnauthorized(true);
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