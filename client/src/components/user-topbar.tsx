import React from "react";
import { CircleUser, Gamepad2, Menu, Package2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem,
} from "./ui/dropdown-menu";

type Props = {};

const UserTopBar = (props: Props) => {
    return (
        <>
            <nav className='hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6'>
                <Link to='/' className='flex items-center gap-2 text-lg font-semibold md:text-base'>
                    <Gamepad2 className='h-6 w-6' />
                    Hackathon
                </Link>
                <Link to='/user' className='text-muted-foreground transition-colors hover:text-foreground'>
                    Dashboard
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
                        <Link to='/' className='flex items-center gap-2 text-lg font-semibold'>
                            <Gamepad2 className='h-6 w-6' />
                        </Link>
                        <Link to='/user' className='text-muted-foreground transition-colors hover:text-foreground'>
                            Dashboard
                        </Link>
                    </nav>
                </SheetContent>
            </Sheet>
            <div className='flex w-full justify-end items-center gap-4 md:ml-auto md:gap-2 lg:gap-4'>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant='secondary' size='icon' className='rounded-full'>
                            <CircleUser className='h-5 w-5' />
                            <span className='sr-only'>Toggle user menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuItem>Support</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </>
    );
};

export default UserTopBar;
