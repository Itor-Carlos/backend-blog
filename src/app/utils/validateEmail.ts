const validRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const validateEmail = (email: string) => {
  if (email.match(validRegex)) {
    return true;
  }
  return false;
};
