export interface Match {
  path: string;
  params: {
    [param: string]: string | undefined;
  };
}
