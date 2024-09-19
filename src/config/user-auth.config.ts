export const userAuthConfig = {
  username: {
    minLength: 3,
    maxLength: 30,
    regex: /^[a-zA-Z0-9_-]+$/,
  },
  password: {
    minLength: 6,
    maxLength: 30,
    hasLowerCase: /[a-z]/,
    hasUpperCase: /[A-Z]/,
    hasNumber: /\d/,
    hasSpecialChar: /[@$!%*?&#]/,
  },
  email: {
    maxLength: 50,
  },
};

export const errorMessages = {
  username: {
    minLength: (min: number) =>
      `El nombre de usuario debe tener al menos ${min} caracteres`,
    maxLength: (max: number) =>
      `El nombre de usuario no debe tener más de ${max} caracteres`,
    invalidChars:
      "El nombre de usuario solo puede contener letras, números, guiones bajos o guiones medios",
    noSpaces: "El nombre de usuario no debe contener espacios",
  },
  password: {
    minLength: (min: number) =>
      `La contraseña debe tener al menos ${min} caracteres`,
    maxLength: (max: number) =>
      `La contraseña no debe tener más de ${max} caracteres`,
    noSpaces: "La contraseña no debe contener espacios",
    hasLowerCase: "La contraseña debe contener al menos una letra minúscula",
    hasUpperCase: "La contraseña debe contener al menos una letra mayúscula",
    hasNumber: "La contraseña debe contener al menos un número",
    hasSpecialChar: "La contraseña debe contener al menos un carácter especial",
  },
  email: {
    invalid: "El correo electrónico no es válido",
    maxLength: (max: number) =>
      `El correo electrónico no debe exceder los ${max} caracteres`,
    noSpaces: "El correo electrónico no debe contener espacios",
  },
};
