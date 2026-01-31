import { HeroHeader } from "@/components/layout/header";



export default async function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
   

    return (
        <div className="mx-auto">
            <HeroHeader  />
            {children}
        </div>
    );
}
