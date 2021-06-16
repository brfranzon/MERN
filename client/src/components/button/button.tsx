import { Button, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import { ButtonHTMLAttributes } from "react";
import { boxShadowDefault } from "../../theme";

type Props = {
  children?: React.ReactNode,
  onClickMe: (params?: any) => any,
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'],
  status?: 'enabled' | 'disabled'
}


const useStyles = makeStyles(theme => ({
  Button: {
    borderRadius: "50%",
    width: "80px",
    height: "80px",
    boxShadow: boxShadowDefault,
    '&:hover': {
      boxShadow: 'unset',
    },
  },
  enabled: {
    backgroundColor: theme.palette.primary.main + ' !important',
    color: theme.palette.text.primary + ' !important',
  },
  disabled: {
    backgroundColor: theme.palette.secondary.main + ' !important',
    color: theme.palette.common.white + ' !important',
  },
}));



const MyButton = ({ children, onClickMe, type, status }: Props) => {

  const classes = useStyles();

  return (
    <Button
      className={clsx(
        status === 'enabled' && classes.enabled,
        status === 'disabled' && classes.disabled,
      )}
      type={type}
      onClick={onClickMe}
    >
      {children}
    </Button>
  )

}

export default MyButton;