export interface userInterface {
  id: number,
  username: string,
  email: string,
};

export interface authInterface {
  user: userInterface | null,
  isAuthenticated: boolean,
  token: string | null,
  isLoading: boolean
};

export interface loginInterface {
  username: string,
  password: string
};