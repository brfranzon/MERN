import { makeStyles, TextField } from '@material-ui/core';
import { useState } from 'react';
import { useForm } from "react-hook-form";

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    '& h1, h2, h3': {
      marginBottom: theme.spacing(6),
    },
  },
  formRows: {
    display: 'flex',
    flexDirection: 'column',
    '& > .MuiFormControl-root, & > .MuiGrid-root': {
      marginBottom: theme.spacing(3),
    }
  }
}));

type Props = {
  inputValues: ((arg: any ) => any) | undefined;
}

const LoginFormFields = ({ inputValues }: Props) => {

  const classes = useStyles();

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  } );

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [`${e.target.name}`]: `${e.target.value}` });
  }
  inputValues!(formData);

  return <div
    style={{ border: '2px solid red' }}
    className={classes.formRows}
  >
    <TextField
      variant="outlined"
      name="username"
      label="username"
      type="email"
      defaultValue={formData?.username}
      inputProps={{ maxLength: 50 }}
      onChange={onChangeInput}
    />

    <TextField
      variant="outlined"
      name="password"
      label="password"
      type="password"
      defaultValue={formData?.password}
      inputProps={{ maxLength: 50 }}
      onChange={onChangeInput}
    />

  </div>
}

export default LoginFormFields;