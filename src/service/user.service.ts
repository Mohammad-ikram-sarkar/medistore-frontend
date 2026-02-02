import { cookies } from "next/headers";
import { env } from "../../env";

export const userService = {
    getSession: async () => {
        // Logic to get user session
        try {
            const cookiesStore = await cookies();
            console.log('Fetching session from:', `${env.AUTH_URL}/get-session`);
            
            const res = await fetch(`${env.AUTH_URL}/get-session`, {
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookiesStore.toString(),
                },
                cache: "no-store"
            });

            // console.log('Session fetch response status:', res.status);

            if (!res.ok) {
                console.error('Session fetch failed:', res.status, res.statusText);
                return { data: null, error: `Failed to fetch session: ${res.status}` };
            }

            const session = await res.json();
            // console.log('Session response:', session);
            
            if (session === null || !session.user) {
                console.log('No active session found');
                return { data: null, error: "No active session" };
            }

            // console.log('Session user data:', session.user);
            return { data: session.user, error: null };
        } catch (error) {
            console.error('Session error:', error);
            // Return error object instead of throwing to allow graceful handling
            return { data: null, error: `Failed to get user session: ${error instanceof Error ? error.message : 'Unknown error'}` };
        }
    }
}