export const isValidEmail = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
export const isValidPhone = (phone: string): boolean =>
  /^(\+33\s?|0)[0-9](\s?[0-9]){8}$/.test(phone);
