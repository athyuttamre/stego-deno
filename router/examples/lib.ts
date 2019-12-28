export function sleep(ms: number): Promise<void> {
  return new Promise(res => {
    setTimeout(() => {
      res();
    }, ms);
  });
}

export function generateId(): string {
  return Math.random()
    .toString()
    .substring(2);
}
