import React from 'react'
import { NavLink } from "react-router"
import {
    Menubar,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar"
import { Outlet } from 'react-router-dom'
import { useAuth } from '../store/auth';
import { ToastContainer } from 'react-toastify';

export default function Menu() {

    const { isLoggedIn } = useAuth();

    return (
        <>
            <ToastContainer/>
            <Menubar className="justify-around m-auto mt-5 w-auto" style={{ width: "70%" }}>
                <MenubarMenu>
                    <NavLink to="/file">
                        <MenubarTrigger className="MenubarTrigger">File</MenubarTrigger>
                    </NavLink>
                    <NavLink to="/announcement">
                        <MenubarTrigger className="MenubarTrigger">Announcement</MenubarTrigger>
                    </NavLink>
                    {isLoggedIn ? (<NavLink className="nav-link active" aria-current="page" to="/logout">
                        <MenubarTrigger className="MenubarTrigger">
                            Logout
                        </MenubarTrigger>
                    </NavLink>) : (<>
                        <NavLink className="nav-link active" aria-current="page" to="/login">
                            <MenubarTrigger className="MenubarTrigger">
                                Login
                            </MenubarTrigger>
                        </NavLink>
                        <NavLink className="nav-link active" aria-current="page" to="/register">
                            <MenubarTrigger className="MenubarTrigger">
                                Register
                            </MenubarTrigger>
                        </NavLink>
                    </>)
                    }
                </MenubarMenu>
            </Menubar>
            <Outlet />
        </>
    )
}
