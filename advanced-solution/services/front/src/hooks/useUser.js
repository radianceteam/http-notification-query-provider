import axios from "axios";
import useSWR from "swr";

export default function useUser() {
  const {data, mutate} = useSWR("https://http-notifs.xyz/api/auth/me", {
    fetcher: (url) => axios.get(url).then((res) => res.data),
  });

  return {
    user: data && data.data,
    loading: !data,
    error: data && data.error,
    async logout() {
      const res = await axios.post("https://http-notifs.xyz/api/auth/logout");

      mutate("https://http-notifs.xyz/api/auth/me");

      return res.data;
    },
    async login(email, password) {
      const res = await axios.post(
        "https://http-notifs.xyz/api/auth/email-login",
        {
          email,
          password,
        },
        {withCredentials: true},
      );

      mutate("https://http-notifs.xyz/api/auth/me");

      return res.data;
    },
  };
}
