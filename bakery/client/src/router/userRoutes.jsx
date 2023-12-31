import MainPage from "../components/pages/MainPage";
import ProfilePage from "../components/pages/ProfilePage";

export const userRoutes = [
    {
        path: "/main",
        Component: MainPage,
    },
    {
        path: "/profile",
        Component: ProfilePage,
    },
];