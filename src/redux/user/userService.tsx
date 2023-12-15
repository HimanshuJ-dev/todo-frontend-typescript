import axios from "axios";

export function getUser({ email, password }: { email: String, password: String }){
    return axios
      .post("http://localhost:8080/login", {
        email,
        password,
      })
      .then((res) => res.data)
      .catch((err) => console.log("error occured:", err));
}

export function createUser({name, email, password}: {name: String, email: String, password: String}) {
  return axios
    .put("http://localhost:8080/signup", {
      name,
      email,
      password,
    })
    .then((res) => res.data)
    .catch((err) => err);
}

export function getAllUsers() {
  return axios.get("http://localhost:8080/all-users")
    .then((res) => res.data)
    .catch((err) => err);
}