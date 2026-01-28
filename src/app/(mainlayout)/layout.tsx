import { HeroHeader } from "@/components/layout/header";



export default function mainLayout({children} : {children : React.ReactNode}) {
	return (
		<div className="mx-auto">
            <HeroHeader/>
			{children}
		</div>
	);
}

