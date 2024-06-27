import { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import AppTopBar from "./AppTopBar";
import useAuth from "../hooks/useAuth";


export default function Layout() {
    const navigate = useNavigate();
    const { auth } = useAuth();
    const location = useLocation();

    console.log(auth);
    useEffect(() => {
        if (!auth.email && !auth.userId && location.pathname !== '/register') {
            navigate("/login");
        }
    }, [auth, navigate]);

    return (
        <div className='flex flex-col h-screen'>
            <AppTopBar />
            <Outlet />
        </div>
    );
}
