import MainPage from "../components/pages/MainPage";
import ProfilePage from "../components/pages/ProfilePage";
import Basket from "../components/pages/Basket";

export const userRoutes = [
    {
        path: "/main",
        Component: MainPage,
    },
    {
        path: "/profile",
        Component: ProfilePage,
    },
    {
        path: "/basket",
        Component: Basket,
    },
];