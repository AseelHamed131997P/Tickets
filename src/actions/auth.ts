import { CLEAR_MESSAGE, LOGIN_SUCCESS, LOGOUT, SET_MESSAGE } from "./types";
import { SignInPayload, SignUpPayload } from "types";
import { Dispatch } from "redux";
import { api } from "utils";

export const login =
  ({ email, password }: SignInPayload) =>
  (dispatch: Dispatch) => {
    return api
      .post("/auth/login", {
        email: email.toLowerCase(),
        password,
      })
      .then(({ data }) => {
        let userData = {};
        if (data.accessToken) {
          localStorage.setItem("accessToken", data.accessToken);
          userData = data;
        }

        api
          .post("/bisan/login")
          .then(({ data }) => {
            console.log(data);
            localStorage.setItem("user", JSON.stringify(userData));

            dispatch({
              type: LOGIN_SUCCESS,
              payload: { user: userData },
            });

            dispatch({
              type: CLEAR_MESSAGE,
            });
          })
          .catch((error) => {
            console.log(error);
            window.location.href = "/bisan";
          });

        return Promise.resolve();
      })

      .catch((error) => {
        console.log("err", error);

        dispatch({
          type: SET_MESSAGE,
          payload: "email or password wrong please try again!!",
        });

        return Promise.reject();
      });
  };

export const logout = () => (dispatch: Dispatch<any>) =>
  api.post("/auth/logout").then(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    window.location.href = "/login";
    dispatch({
      type: LOGOUT,
    });
  });

export const signup = ({ username, email, password }: SignUpPayload) =>
  api.post("/auth/signup", {
    username,
    email: email.toLowerCase(),
    password,
  });

// export const signup =
//   ({ username, email, password }: SignUpPayload) =>
//   (dispatch: Dispatch) => {
//     return api
//       .post("/auth/signup", {
//         username,
//         email,
//         password,
//       })
//       .then(({ data }) => {
//         dispatch({
//           type: SIGNUP_SUCCESS,
//           payload: { user: data.user },
//         });

//         return Promise.resolve();
//       })
//       .catch((error) => {
//         console.log("err", error);
//         const message =
//           (error.response &&
//             error.response.data &&
//             error.response.data.message) ||
//           error.message ||
//           error.toString();

//         dispatch({
//           type: SIGNUP_FAIL,
//         });

//         dispatch({
//           type: SET_MESSAGE,
//           payload: message,
//         });
//         window.location.href = "/admins";

//         return Promise.reject();
//       });
//   };
