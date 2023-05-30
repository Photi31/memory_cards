export const emailValidation = {
  required: true,
  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
};

export const passwordValidation = {
  required: true,
  minLength: 8,
  maxLength: 18,
};
