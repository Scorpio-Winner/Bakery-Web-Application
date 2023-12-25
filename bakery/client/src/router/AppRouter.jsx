import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { publicRoutes } from "./publicRoutes";
//import { userRoutes } from "./userRoutes";
//import { companyRoutes } from "./companyRoutes";
import { COMPANY_PROFILE_ROUTE, LOGIN_ROUTE, USER_PROFILE_ROUTE } from "../utils/consts";

const AppRouter = () => {
   /* const [jwt, setJwt] = useState(localStorage.getItem("jwt"));
    const navigate = useNavigate();

    useEffect(() => {
        const handleStorageChange = () => {
            setJwt(localStorage.getItem("jwt"));
            navigate("/");
        };

        window.addEventListener("storage", handleStorageChange);
    }, [navigate]);

    /*if (jwt && localStorage.getItem("role") === "user") {
        return (
            <Routes>
                {userRoutes.map(({ path, Component }) => (
                    <Route key={path} path={path} element={<Component />} exact />
                ))}
                <Route key="*" path="*" element={<Navigate to={USER_PROFILE_ROUTE} />} />
            </Routes>
        );
    }

    if (jwt && localStorage.getItem("role") === "company") {
        return (
            <Routes>
                {companyRoutes.map(({ path, Component }) => (
                    <Route key={path} path={path} element={<Component />} exact />
                ))}
                <Route key="*" path="*" element={<Navigate to={COMPANY_PROFILE_ROUTE} />} />
            </Routes>
        );
    }*/

    <Route key="*" path="*" element={<Navigate to={LOGIN_ROUTE} />} />

  /*if (!jwt) {*/
        return (
            <Routes>
                {publicRoutes.map(({ path, Component }) => (
                    <Route key={path} path={path} element={<Component />} exact />
                ))}
                <Route key="*" path="*" element={<Navigate to={LOGIN_ROUTE} />} />
            </Routes>
        );
   /* }*/
};

export default AppRouter;