import { ACCESS_TOKEN_KEY, ACCESS_USER_KEY } from "../shared/constants";
import { api } from "./api";
export const authAPI = {
  loginWithGoogle: () => {
    window.location.href = `${process.env.NEXT_PUBLIC_GOOGLE_OAUTH_URL}`;
  },
  getProfile: async () => {
    const res = await api.get("/auth/profile");
    return res?.data;
  },
  logout: () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(ACCESS_USER_KEY);
    window.location.href = "/";
  },
};
