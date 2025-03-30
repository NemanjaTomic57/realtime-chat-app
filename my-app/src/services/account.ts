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

export const getAllChats = async (cookie: string) => {
  const result = await fetch(apiUrl + "chat", {
    method: "GET",
    headers: {
      cookie: cookie,
    },
    cache: "no-cache",
  });

  if (result.status == 200) {
    const chats = await result.json();
    console.log(chats);
    return chats as ChatRoom[];
  } else {
    return null;
  }
}