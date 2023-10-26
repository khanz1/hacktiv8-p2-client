import { createBrowserRouter, redirect } from "react-router-dom";
import HomePage from "../pages/HomePage";
import MovieDetailPage from "../pages/MovieDetailPage";
import DashboardPage from "../pages/DashboardPage";
import GenreListPage from "../pages/GenreListPage";
import Navbar from "../components/Navbar";
import LoginPage from "../pages/LoginPage";
import RegisterUserPage from "../pages/RegisterUserPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <HomePage />
      </>
    ),
  },
  {
    path: "/login",
    loader: () => {
      if (localStorage.getItem("access_token")) {
        throw redirect("/admin");
      }
      return null;
    },
    element: (
      <>
        <Navbar />
        <LoginPage />
      
      </>
    ),
  },
  {
    path: "/movies/:id",
    element: <MovieDetailPage />,
  },
  {
    path: "/admin",
    loader: () => {
      if (!localStorage.getItem("access_token")) {
        throw redirect("/login");
      }
      return null;
    },
    element: (
      <>
        <DashboardPage />
      </>
    ),
  },
  {
    path: "/admin/genres",
    loader: () => {
      if (!localStorage.getItem("access_token")) {
        throw redirect("/login");
      }
      return null;
    },
    element: <GenreListPage />,
  },
  {
    path: "/admin/user",
    loader: () => {
      if (!localStorage.getItem("access_token")) {
        throw redirect("/login");
      }
      return null;
    },
    element: <RegisterUserPage />,
  },
]);

export default router;