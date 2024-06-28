import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import useAuth from "../hooks/useAuth";
import { Button } from "@/components/ui/button";
import AdminTopBar from "@/components/admin-topbar";
import UserTopBar from "@/components/user-topbar";
import { ModeToggle } from "@/components/mode-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Gamepad2, Menu, Package2 } from "lucide-react";

function ResponsiveAppBar() {
    const { auth } = useAuth();
    const logout = useLogout();
    const navigate = useNavigate();

    return (
        <header className='flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 pt-4 pb-4 pl-4 pr-4'>
            {auth.role ? (
                auth.role === "admin" ? (
                    <AdminTopBar />
                ) : (
                    <UserTopBar />
                )
            ) : (
                <>
                    <nav className='hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6'>
                        <Link to='/' className='flex items-center gap-2 text-lg font-semibold md:text-base'>
                            <Gamepad2 className='h-6 w-6' />
                            Hackathon
                        </Link>
                    </nav>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant='outline' size='icon' className='shrink-0 md:hidden'>
                                <Menu className='h-5 w-5' />
                                <span className='sr-only'>Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side='left'>
                            <nav className='grid gap-6 text-lg font-medium'>
                                <Link to='/' className='flex items-center gap-2 text-lg font-semibold md:text-base'>
                                    <Gamepad2 className='h-6 w-6' />
                                    Hackathon
                                </Link>
                            </nav>
                        </SheetContent>
                    </Sheet>
                    <div className='flex w-full justify-end items-center gap-4 md:ml-auto md:gap-2 lg:gap-4'>
                        <Button
                            onClick={() => {
                                navigate("/login");
                            }}
                            className='btn btn-primary'
                        >
                            Se connecter
                        </Button>
                        <Button
                            onClick={() => {
                                navigate("/register");
                            }}
                            className='btn btn-secondary'
                        >
                            S'inscrire
                        </Button>
                    </div>
                </>
            )}
            <ModeToggle />
        </header>
    );
}
export default ResponsiveAppBar;
