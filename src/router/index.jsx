import { createBrowserRouter, redirect } from "react-router-dom";
import HomePage from "../pages/HomePage";
import MovieDetailPage from "../pages/MovieDetailPage";
import DashboardPage from "../pages/DashboardPage";
import GenreListPage from "../pages/GenreListPage";
import LoginPage from "../pages/LoginPage";
import RegisterUserPage from "../pages/RegisterUserPage";
import AdminLayout from "../layouts/AdminLayout";
import PublicLayout from "../layouts/PublicLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { path: "", element: <HomePage /> },
      {
        path: "login",
        loader: () => {
          if (localStorage.getItem("access_token")) {
            throw redirect("/admin");
          }
          return null;
        },
        element: <LoginPage />,
      },
    ],
  },
  { path: "movies/:id", element: <MovieDetailPage /> },
  {
    path: "/admin",
    loader: () => {
      if (!localStorage.getItem("access_token")) {
        throw redirect("/login");
      }
      return null;
    },
    element: <AdminLayout />,
    children: [
      { path: "", element: <DashboardPage /> },
      { path: "genres", element: <GenreListPage /> },
      { path: "user", element: <RegisterUserPage /> },
    ],
  },
]);

export default router;
