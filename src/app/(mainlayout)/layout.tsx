import { HeroHeader } from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default async function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
   

    return (
        <div className="mx-auto">
            <HeroHeader  />
            {children}
            <Footer />
        </div>
    );
}
