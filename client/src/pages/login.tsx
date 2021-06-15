import { useEffect, useState } from "react";
import { getUser } from "../api/api";



const Login = () => {

  const user: any[] = [];
  const [userfromDB, setUserFromDB] = useState(user);
  const [email, setEmail] = useState('');
  const [psw, setPwd] = useState('');

  useEffect(() => {
    getUser()
      .then(user =>
        setUserFromDB(user.data)
      )
      .catch(err => console.log(err))
  }, [])


  const handleSubmit = (e: any) => {
    const data = {
      username: email,
      password: psw
    }
    e.preventDefault();

    console.log(userfromDB);

    if (userfromDB.filter(el => el.username == data.username).length > 0) return alert('User in der DB'), console.log('OK')
    return alert('User NOT in der DB');
  }

  return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100vh" }}>
    <form
      style={{ display: "flex", flexDirection: "column", width: 300, padding: 20, border: "2px solid" }}
      onSubmit={handleSubmit}
    >
      <input placeholder="name" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="psw" value={psw} onChange={(e) => setPwd(e.target.value)} />

      <button type="submit"> Submit </button>
    </form>
  </div>


}

export default Login;