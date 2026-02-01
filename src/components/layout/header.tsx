'use client'
import Link from 'next/link'
import { Logo } from '@/components/logo'
import { Menu, X, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import React from 'react'
import { cn } from '@/lib/utils'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { ModeToggle } from './ModeToggle'
import { CartIcon } from '@/components/ui/cart-icon'

const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'About', href: '/about' },
]

export const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)
    const [isScrolled, setIsScrolled] = React.useState(false)
    const router = useRouter()
    const { data: session, isPending } = authClient.useSession()

    const handleLogout = async () => {
        await authClient.signOut()
        router.push('/')
        router.refresh()
    }
    
    // const role

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header>
            <nav
                data-state={menuState && 'active'}
                className="fixed mt-2 z-20 w-full px-2">
                <div className={cn('mx-auto mt-2 max-w-7xl px-6 transition-all duration-300 lg:px-12', isScrolled && 'bg-background/50 max-w-6xl rounded-2xl border backdrop-blur-lg lg:px-5')}>
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-2 lg:gap-0 lg:py-2">
                        <div className="flex w-full justify-between lg:w-auto">
                            <Link
                                href="/"
                                aria-label="home"
                            >
                                <Logo />
                            </Link>

                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                                <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                            </button>
                        </div>

                        <div className="absolute inset-0 m-auto hidden size-fit lg:block">
                            <ul className="flex gap-8 text-sm">
                                {menuItems.map((item, index) => (
                                    <li key={index}>
                                        <Link
                                            href={item.href}
                                            className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                            <span>{item.name}</span>
                                        </Link>
                                    </li>
                                ))}
                                {
                                    session?.user && (
                                        <Link href={"/dashboard"} 
                                        className="text-muted-foreground hover:text-accent-foreground block duration-150"
                                        >
                                            <span>Dashboard</span>
                                        </Link>
                                    )  
                                }
                               
                            </ul>
                        </div>

                        <div className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
                            <div className="lg:hidden">
                                <ul className="space-y-6 text-base">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                href={item.href}
                                                className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                                <span>{item.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            
                            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                                <CartIcon />
                                {isPending ? (
                                    // 🔄 LOADING
                                    <div className="flex gap-3">
                                        <div className="h-9 w-20 rounded-md bg-muted animate-pulse" />
                                        <div className="h-9 w-24 rounded-md bg-muted animate-pulse" />
                                    </div>
                                ) : session?.user ? (
                                    // ✅ LOGGED IN
                                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                                        <div className="flex items-center gap-3 px-3 rounded-lg bg-muted/50">
                                            {session.user.image && (
                                                <img
                                                    src={session.user.image}
                                                    alt={session.user.name}
                                                    className="w-8 h-8 rounded-full object-cover"
                                                />
                                            )}
                                            <div className="flex-1">
                                                <p className="font-semibold text-foreground">{session.user.name}</p>
                                            </div>
                                        </div>
                                        <Button
                                            onClick={handleLogout}
                                            variant="outline"
                                            size="sm"
                                            className="w-full sm:w-auto whitespace-nowrap">
                                            <LogOut className="mr-2 h-4 w-4" />
                                            Logout
                                        </Button>
                                    </div>
                                ) : (
                                    // ❌ NOT LOGGED IN
                                    <>
                                        <Button
                                            asChild
                                            variant="outline"
                                            size="sm"
                                            className="w-full sm:w-auto">
                                            <Link href="/login">
                                                <span>Login</span>
                                            </Link>
                                        </Button>
                                        <Button
                                            asChild
                                            size="sm"
                                            className="w-full sm:w-auto">
                                            <Link href="/register">
                                                <span>Register</span>
                                            </Link>
                                        </Button>
                                    </>
                                )}
                            </div>
                            <ModeToggle/>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}