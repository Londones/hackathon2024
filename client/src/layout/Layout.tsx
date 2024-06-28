import React, { createContext, useContext } from "react";
import { Outlet } from "react-router-dom";
import AppTopBar from "./AppTopBar";

export const LayoutContext = createContext(null);

export const useLayout = () => {
    return useContext(LayoutContext);
};

export function Layout() {
    return (
        <div className='flex flex-col h-screen'>
            <AppTopBar />
            <LayoutContext.Provider value={true}>
                <Outlet />
            </LayoutContext.Provider>
        </div>
    );
}
