export const absurd = (value: any): never => {
  throw new Error(`Unhandled case: ${value}`);
};
