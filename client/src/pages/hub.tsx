import { useHistory } from "react-router-dom";
import MyButton from "../components/button/button";


const Hub = () => {

  const history = useHistory();

  return (
    <MyButton
      onClickMe={() => history.push('/login')}
    >
      Log Out
    </MyButton>
  )
}

export default Hub;