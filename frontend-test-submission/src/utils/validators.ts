export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const isValidShortcode = (code: string): boolean => {
  return /^[a-zA-Z0-9]{4,10}$/.test(code);
};

export const isValidValidityMinutes = (val: string): boolean => {
  return /^\d+$/.test(val) && parseInt(val, 10) > 0;
};
