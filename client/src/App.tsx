import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Layout from "./layout/Layout";
import HomeAdmin from "./pages/HomeAdmin";
import AdminDashboard from "./pages/AdminDashboard";
import PersistLogin from "./auth/PersistLogin";
import RequireAuth from "./components/RequireAuth";
import UserDashboard from "./pages/UserDashboard";
import React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

function App() {
    const { auth } = useAuth();

    return (
        <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
            <Router>
                <Routes>
                    <Route path='/' element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route element={<PersistLogin />}>
                            <Route path='/admin/*' element={<RequireAuth allowedRoles={["admin"]} />}>
                                <Route index element={<HomeAdmin />} />
                                <Route path='dashboard' element={<AdminDashboard />} />
                            </Route>
                            <Route path='/user/*' element={<RequireAuth allowedRoles={["user"]} />}>
                                <Route index element={<UserDashboard />} />
                            </Route>
                        </Route>
                        <Route path='/login' element={<LoginForm />} />
                        <Route path='/register' element={<RegisterForm />} />
                    </Route>
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </Router>
            <Toaster />
        </ThemeProvider>
    );
}

export default App;
