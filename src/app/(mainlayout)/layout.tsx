import { HeroHeader } from "@/components/layout/header";
import { userService } from "@/service/user.service";


export default async function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    let user = null;

    try {
        const { data, error } = await userService.getSession();
        if (!error) {
            user = data;
        }
    } catch {
        user = null;
    }

    return (
        <div className="mx-auto">
            <HeroHeader  />
            {children}
        </div>
    );
}
