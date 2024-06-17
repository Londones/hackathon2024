import { useNavigate } from "react-router-dom";
import React from "react";
import useAuth from "../hooks/useAuth";

const Home = () => {
    const { auth } = useAuth();

    return <div>Home User</div>;
};

export default Home;
