import { HeroHeader } from "@/components/layout/header";
import { userService } from "@/service/user.service";

export default async function MainLayout({ children }: { children: React.ReactNode }) {
    // Fetch session data with error handling for build time
    let user = null;
    
    try {
        const { data, error } = await userService.getSession();
        if (!error) {
            user = data;
        }
    } catch (err) {
        // Silently fail during build/prerendering
        user = null;
    }

    return (
        <div className="mx-auto">
            <HeroHeader user={user} />
            {children}
        </div>
    );
}
