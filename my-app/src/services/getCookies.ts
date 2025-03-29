import { cookies } from "next/headers";

export const getApiCookie = async () => {
  const cookieStore = await cookies();
  const cookie = cookieStore.toString();
  return cookie || "";
};
