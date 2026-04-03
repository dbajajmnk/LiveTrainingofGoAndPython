import { UI_CONSTANTS } from "../Compontent/UI_Constants";

export function validateLogin(userInfo) {
  console.log("User Info",userInfo);
  if (!userInfo.email.includes("@")) {
    return UI_CONSTANTS.validtionMessages.invalidEmail;
  }

  if (userInfo.password.length < 6) {
    return UI_CONSTANTS.validtionMessages.shortPassword;
  }

  return "";
}