import axios from "axios";
import { toast } from "react-toastify";
import { withCookies } from "react-cookie";

// export const fetchListOfItem = async ({ params, props }) => {
//   toast("fetch item func");

//   const result = await axios.get(
//     "http://localhost:4000/api/v1/products/" + params.orderID,
//     {
//       headers: {
//         token: props.cookies.get("auth_token"),
//       },
//     }
//   );
// };
