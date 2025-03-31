import { cookies } from "next/headers";

export const getAllCookies = async () => {
  const cookieStore = await cookies();
  const cookie = cookieStore.toString();
  return cookie || "";
};
