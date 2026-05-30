import { createBrowserRouter } from "react-router";
import { LandingPage } from "./components/LandingPage";
import { LoginPage } from "./components/LoginPage";
import { SignupPage } from "./components/SignupPage";
import { DashboardPage } from "./components/DashboardPage";
import { CreateNotePage } from "./components/CreateNotePage";
import { NoteDetailsPage } from "./components/NoteDetailsPage";
import { SearchPage } from "./components/SearchPage";
import { AboutPage } from "./components/AboutPage";
import { DashboardLayout } from "./components/DashboardLayout";
export const router = createBrowserRouter([
    {
        path: "/",
        Component: LandingPage,
    },
    {
        path: "/login",
        Component: LoginPage,
    },
    {
        path: "/signup",
        Component: SignupPage,
    },
    {
        path: "/about",
        Component: AboutPage,
    },
    {
        path: "/dashboard",
        Component: DashboardLayout,
        children: [
            { index: true, Component: DashboardPage },
            { path: "notes/new", Component: CreateNotePage },
            { path: "notes/:id", Component: NoteDetailsPage },
            { path: "search", Component: SearchPage },
        ],
    },
]);
