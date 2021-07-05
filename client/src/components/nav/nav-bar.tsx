import React, { useContext } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../../pages/routes';
import { authContext } from '../../context/auth-context';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

export default function NavBar() {

  const classes = useStyles();
  const history = useHistory();
  const { isAuth, setIsAuth, token, setToken } = useContext(authContext);


  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" className={classes.title}>
            News
          </Typography>

          <Button
            color="inherit"
            onClick={() => {
              setIsAuth(false);
              history.replace(ROUTES.login);
            }}
          >
            Logout
          </Button>

        </Toolbar>
      </AppBar>


      {
        !isAuth && <p> test </p>
      }
    </div >
  );
}
