// import axios from "axios";
// import { toast } from "react-toastify";
// import { withCookies } from "react-cookie";

// export const userLoginService = (email, password) => {
//   axios
//     .post("http://localhost:4000/api/v1/user/login", {
//       email,
//       password,
//     })
//     .then(response => {
//       toast("2");
//       // after successful login, store the token as cookie
//       const { cookies } = this.props;

//       cookies.set("auth_token", response.data.token, {
//         path: "/",
//       });
//       toast("login successful, user is found");
//       this.props.history.push("/");
//     })
//     .catch(err => {
//       toast(err);
//       // console.log(err);
//     });
// };
