import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AppTopBar from "./AppTopBar";
import useAuth from "../hooks/useAuth";

export default function Layout() {
    const navigate = useNavigate();
    const { auth } = useAuth();

    useEffect(() => {
        if (!auth) {
            navigate("/login");
        }
    }, [navigate]);

    return (
        <div className='flex flex-col h-screen'>
            <AppTopBar />
            <Outlet />
        </div>
    );
}
