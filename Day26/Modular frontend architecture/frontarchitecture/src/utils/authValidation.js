export function validateLogin(email, password) {
  if (!email.includes("@")) {
    return "Invalid email";
  }

  if (password.length < 6) {
    return "Password too short";
  }

  return "";
}