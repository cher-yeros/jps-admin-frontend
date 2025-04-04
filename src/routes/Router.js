import { lazy } from "react";
import { Navigate } from "react-router-dom";
import AuthWrapper from "../components/container/AuthWrapper";
import Loadable from "../layouts/full/shared/loadable/Loadable";
import TeachingCategory from "../views/categoires/TeachingCategory";
import Partners from "../views/partners/Partners";
import Teaching from "../views/teachings/Teaching";

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import("../layouts/full/FullLayout")));
const BlankLayout = Loadable(
  lazy(() => import("../layouts/blank/BlankLayout"))
);

/* ****Pages***** */
const Dashboard = Loadable(lazy(() => import("../views/dashboard/Dashboard")));
const SamplePage = Loadable(
  lazy(() => import("../views/sample-page/SamplePage"))
);
const Packages = Loadable(lazy(() => import("../views/packages/Packages")));

const Error = Loadable(lazy(() => import("../views/authentication/Error")));

const Login = Loadable(lazy(() => import("../views/authentication/Login")));

const Router = [
  {
    path: "/",
    element: <AuthWrapper />,
    children: [
      {
        path: "/",
        element: <FullLayout />,
        children: [
          { path: "/", element: <Navigate to="/dashboard" /> },
          { path: "/dashboard", exact: true, element: <Dashboard /> },
          { path: "/packages", exact: true, element: <Packages /> },
          { path: "/teachings", exact: true, element: <Teaching /> },
          { path: "/partners", exact: true, element: <Partners /> },
          { path: "/subscriptions", exact: true, element: <SamplePage /> },
          {
            path: "/teaching-categories",
            exact: true,
            element: <TeachingCategory />,
          },
          { path: "/payments", exact: true, element: <SamplePage /> },
          // { path: "/icons", exact: true, element: <Icons /> },
          // { path: "/ui/typography", exact: true, element: <TypographyPage /> },
          // { path: "/ui/shadow", exact: true, element: <Shadow /> },
          { path: "*", element: <Navigate to="/auth/404" /> },
        ],
      },
      {
        path: "/auth",
        element: <BlankLayout />,
        children: [
          { path: "404", element: <Error /> },
          // { path: "/auth/register", element: <Register /> },
          { path: "/auth/login", element: <Login /> },
          { path: "*", element: <Navigate to="/auth/404" /> },
        ],
      },
    ],
  },
];

export default Router;
