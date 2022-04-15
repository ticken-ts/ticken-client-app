export enum ScreenId {
  Login = "Login",
  Register = "Register",
  Home = "Home",
}

export type RootStackParamList = {
  [ScreenId.Login]: undefined;
  [ScreenId.Register]: undefined;
  [ScreenId.Home]: undefined;
}
