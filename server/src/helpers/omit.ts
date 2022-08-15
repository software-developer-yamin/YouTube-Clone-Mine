export const omit = <T>(obj: T, propriety: keyof T | (keyof T)[]) => {
  const keys = Array.isArray(propriety) ? propriety : [propriety];
  const newObj = { ...obj };
  keys.forEach((key) => {
    delete newObj[key];
  });
  return newObj;
};
