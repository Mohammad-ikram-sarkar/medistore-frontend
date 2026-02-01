"use server";

import { cookies } from "next/headers";
import { env } from "../../env";

const RoleStatusChangeAction = async (id: string, role: string) => {
    try {
        const cookieStore = await cookies();
        const response = await fetch(`${env.BACKEND_URL}/api/admin/users/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Cookie: cookieStore.toString(),
          },
          body: JSON.stringify({ role }),
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const data = await response.json();
        return { success: true, data: data.data, error: null };
      } catch (err) {
        return { success: false, data: null, error: "API not working or request failed" };
      }
}

export default RoleStatusChangeAction;