"use client"

import { logout } from "@/services/accountService";
import Button from "@/shared/ui/button";

export default function LogoutButton() {
  return (
    <Button onClick={logout} className="btn__chat-header">
      Logout
    </Button>
  );
}
