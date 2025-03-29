import { apiUrl } from "@/environment";
import { routes } from "@/routes";

export const getUserInfo = async (cookie: string) => {
  const result = await fetch(apiUrl + "account/user-info", {
    method: "GET",
    headers: {
      cookie: cookie,
    },
    cache: "no-cache",
  });

  if (result.status == 200) {
    const user = await result.json();
    console.log(user);
    return user as User;
  } else {
    return null;
  }
};

export const logout = async () => {
  await fetch(apiUrl + "account/logout", {
    method: "GET",
    credentials: "include",
  });

  window.location.href = routes.login;
};
