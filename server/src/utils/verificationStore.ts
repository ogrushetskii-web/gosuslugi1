const emailCodes = new Map<string, string>();

export const storeEmailCode = (email: string, code: string) => {
  emailCodes.set(email, code);
};

export const verifyEmailCode = (email: string, code: string) => {
  return emailCodes.get(email) === code;
};

export const clearEmailCode = (email: string) => {
  emailCodes.delete(email);
};
