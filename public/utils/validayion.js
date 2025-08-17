export const isRequired = (value) => value.trim() !== '';

export const isValidEmail = (email) =>
  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);

export const isValidPassword = (password) =>{
  return {
    minLength: password.length >= 6,
    hasLower: /[a-z]/.test(password),
    hasUpper: /[A-Z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecial: /[\W_]/.test(password),
  };
}
export const isPasswordMatch = (password, confirmPassword) =>
  password === confirmPassword;

