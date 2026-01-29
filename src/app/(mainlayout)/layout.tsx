import { HeroHeader } from "@/components/layout/header";
import { userService } from "@/service/user.service";
; // your user service path

export default async function MainLayout({ children }: { children: React.ReactNode }) {
    // Fetch session data
    const { data: user, error } = await userService.getSession();

    return (
        <div className="mx-auto">
            <HeroHeader user={user} />
            {children}
        </div>
    );
}
