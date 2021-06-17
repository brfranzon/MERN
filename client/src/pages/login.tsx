import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getUser } from "../api/api";
import MyButton from "../components/button/button";
import { Box, Button, Input, FormControl, makeStyles, IconButton, InputAdornment, OutlinedInput, Paper, Typography } from '@material-ui/core';
import { useForm } from 'react-hook-form';


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
  },
  Paper: {
    padding: theme.spacing(8, 8, 10, 8),
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    maxWidth: 800,
  },
  headline: {
    paddingBottom: theme.spacing(4),
  },
  FormControl: {
    marginTop: theme.spacing(2),
  },
  Input: {
    width: 400,
  },
  submitBtn: {
    marginTop: theme.spacing(8),
  },
  emailCheckIcon: {
    color: theme.palette.flashy.main,
  },
  pwIcon: {
    color: theme.palette.text.secondary,
    cursor: 'pointer',
  },
  authError: {
    marginTop: theme.spacing(2),
  },
  confirmationIcon: {
    width: 64,
    margin: 'auto',
  },
  marginTop2: {
    marginTop: theme.spacing(2),
  },
  marginTop10: {
    marginTop: theme.spacing(10),
  },
  forgotPassContainer: {
    marginTop: theme.spacing(2),
    textAlign: 'right',
  },
  forgotPass: {
    textDecoration: 'underline',
    '&:hover': {
      cursor: 'pointer',
    },
    color: 'unset',
  },
  input:{
    border: "1px solid",
    marginBottom: 8,
    borderRadius: 30
  }
}));

type User = {
  username: string;
  password: string;
}

type LoginProps = {
  isLoggedIn: (param: boolean) => any;
}

const Login = ({ isLoggedIn }: LoginProps) => {

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
    <form onSubmit={handleSubmit} className={classes.container}>
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">

        <Paper elevation={8} className={classes.Paper}>
          <div className={classes.headline}>
            <Typography variant="h3" align="center">
              {'forms.login.headline'}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary" align="center">
              {'forms.login.subtitle'}
            </Typography>
          </div>

          <Input className={classes.input} placeholder="name" name="username" value={formData.username} onChange={handleChangeInput} />
          <Input className={classes.input} placeholder="password" type="password" name="password" value={formData.password} onChange={handleChangeInput} />

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <MyButton
              onClickMe={(e) => handleSubmit(e)}
              type="submit"
              status="enabled"
            >
              Login
            </MyButton>
            <MyButton
              onClickMe={(e) => handleSubmit(e)}
              type="submit"
              status="disabled"
            >
              Register
            </MyButton>
          </div>

        </Paper>
      </Box>
    </form>
  );
}

export default Login;