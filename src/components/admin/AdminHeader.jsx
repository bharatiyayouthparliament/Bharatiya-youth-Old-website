
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { LogOut, Menu, UserCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const AdminHeader = ({ setSidebarOpen }) => {
    const { user, logout } = useAuth();

    return (
        <header className="flex items-center justify-between px-6 py-3 bg-white border-b-2 border-gray-200">
            <button
                onClick={() => setSidebarOpen(true)}
                className="text-gray-500 focus:outline-none lg:hidden"
            >
                <Menu size={24} />
            </button>
            <div className="flex-1"></div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                         <UserCircle size={28} className="text-gray-600" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">{user?.name}</p>
                            <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                            <p className="text-xs font-bold uppercase leading-none text-[#a0291f] pt-1">{user?.role.replace('_', ' ')}</p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    );
};

export default AdminHeader;
