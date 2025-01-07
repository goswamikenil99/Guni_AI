// utils/validation.js

export const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@(gnu\.ac\.in|guni\.ac\.in|ganpatuniversity\.ac\.in)$/;
    return emailPattern.test(email);
  };
  
  export const validatePassword = (password) => {
    // Example: Password must be at least 6 characters long
    return password.length >= 6;
  };
  