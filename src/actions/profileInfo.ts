import {
  ChangePasswordPayload,
  ProfileInfoPayload,
  ProfilePasswordPayload,
} from "types";
import { api } from "utils";

export const updateProfile = ({ username, gender }: ProfileInfoPayload) =>
  api.put("/account/profile", {
    username: username,
    gender: gender,
  });
export const updatePassword = ({
  password,
  confirmPassword,
}: ProfilePasswordPayload) =>
  api.put("/account/password", {
    password: password,
    confirmPassword: confirmPassword,
  });
export const changePassword = ({
  userId,
  password,
  confirmPassword,
}: ChangePasswordPayload) => {
  console.log("hiiiiii");
  console.log(userId);
  console.log(password);
  console.log(confirmPassword);

  return api.post("/account/password", {
    password: password,
    confirmPassword: confirmPassword,
    id: userId,
  });
};
