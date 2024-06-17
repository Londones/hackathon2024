import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

const HomeAdmin = () => {
    const { auth } = useAuth();

    return <div>Home Admin</div>;
};

export default HomeAdmin;
