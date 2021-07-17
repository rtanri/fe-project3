import axios from "axios";

export const findUserData = (email, password) => {
  axios
    .post("http://localhost:4000/api/v1/user/login", {
      email,
      password,
    })
    .then(response => {
      // after successful login, store the token as cookie
      const { cookies } = this.props;

      cookies.set("auth_token", response.data.token, {
        path: "/",
      });
      console.log("login successful");
      this.props.history.push("/");
    })
    .catch(err => {
      console.log(err);
    });
};
