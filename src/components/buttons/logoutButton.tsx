import React from "react";
import { useLogout } from "@/lib/hooks/useLogout";

export function LogoutButton() {
    const logout = useLogout();

    return <button onClick={logout} className="btn-logout">
        Logout
    </button>
}

