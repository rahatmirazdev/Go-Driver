export const validatePassword = (password) => {
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const isValidLength = password.length >= 6;

  if (!hasUppercase) {
    return "Password must have at least one uppercase letter.";
  }
  if (!hasLowercase) {
    return "Password must have at least one lowercase letter.";
  }
  if (!isValidLength) {
    return "Password must be at least 6 characters long.";
  }
  return "";
};
