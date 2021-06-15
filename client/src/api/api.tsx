import axios from "axios"

export const getUser = () => {
  return axios.get('http://localhost:5000/users');
}