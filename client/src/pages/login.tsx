import { makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getUser } from "../api/api";
import MyButton from "../components/button/button";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100vh",
    animationName: "$Fade",
    animationDuration: "2000ms",
    animationFillMode: "forwards"
  },
  "@keyframes Fade": {
    "0%": {
      backgroundColor: theme.palette.common.white
    },
    "100%": {
      backgroundColor: theme.palette.background,
    }
  },
  form: {
    border: "2px solid green",
    display: "flex",
    flexDirection: "column",
    width: 300,
    padding: 20
  }
}));

type User = {
  username: string;
  password: string;
}

type LoginProps = {
  isLoggedIn: (param: boolean) => any;
}

const Login = ({isLoggedIn}: LoginProps) => {

  const classes = useStyles();

  const initUserDB: User[] = [];
  const [userDB, setUserDB] = useState(initUserDB);
  const [formData, setFormData] = useState<User>({
    username: '',
    password: ''
  });

  const [isLogin, setIsLogin] = useState(false);
  const history = useHistory();

  useEffect(() => {
    getUser()
      .then(user =>
        setUserDB(user.data)
      )
      .catch(err => console.log(err))
  }, [])


  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [`${e.target.name}`]: `${e.target.value}` })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(userDB);
    if (userDB.filter((el: any) => el.username === formData.username).length > 0) {
      setIsLogin(true);
      isLoggedIn(true); 
      history.push('/hub')
    }
    setIsLogin(false);
    return alert('User NOT in der DB');
  }

  return (
    <div className={classes.container}>

      <form className={classes.form} onSubmit={handleSubmit}>

        <input placeholder="name" name="username" value={formData.username} onChange={handleChangeInput} />
        <input placeholder="password" name="password" value={formData.password} onChange={handleChangeInput} />

        <MyButton
          onClickMe={(e) => handleSubmit(e)}
          type="submit"
          status="enabled"
        >
          Submit
        </MyButton>
      </form>
    </div>
  );

}

export default Login;