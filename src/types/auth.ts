export type IAuth = {
  id: number;
  username: string;
  email: string;
  isAdmin: boolean;
  isStaff: boolean;
  isLogin: boolean;
};

export type AuthState = "initial" | "loading" | "complete" | "error";
