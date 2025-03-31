import { apiUrl } from "@/environment";

export const getAllContacts = async (cookie: string) => {
  const response = await fetch(apiUrl + "contacts", {
    method: "GET",
    headers: {
      cookie: cookie,
    },
    cache: "no-cache",
  });

  if (response.status == 200) {
    const result = await response.json();
    return result as Contact[];
  } else if (response.status == 401) {
    return null;
  } else {
    console.log(await response.text())
    return null;
  }
};
