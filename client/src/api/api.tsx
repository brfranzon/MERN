import axios from "axios"

export const getUser = () => {
  return axios.get('http://localhost:5000/users');
}


export const getUserByID = (id: any) => {
  return axios.get( `http://localhost:5000/users/${id}`, {
    headers: { authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImV1MiIsInBhc3N3b3JkIjoiMTIzNDUiLCJpYXQiOjE2MjM5MzgxMjcsImV4cCI6MTYyMzkzODE4N30.UppEm8Wd3O0q-Lg1scB_HHMyh0PWPNWI71ES-NqBprU"}` }
  });
}

// create user
export const createNewUser = (data: any) => {
  return axios.post('http://localhost:5000/users/add', data);
}


// get authorizided user
export const userTokenVerified = () => {
  return axios.get('http://localhost:5000/userTokenVerified');
}