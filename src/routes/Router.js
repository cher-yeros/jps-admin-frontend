import { lazy } from "react";
import { Navigate } from "react-router-dom";
import AuthWrapper from "../components/container/AuthWrapper";
import Loadable from "../layouts/full/shared/loadable/Loadable";

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
const Teaching = Loadable(lazy(() => import("../views/teachings/Teaching")));
const Partners = Loadable(lazy(() => import("../views/partners/Partners")));
const TeachingCategory = Loadable(
  lazy(() => import("../views/categoires/TeachingCategory"))
);
const Payments = Loadable(lazy(() => import("../views/payment/Payments")));
const Subscription = Loadable(
  lazy(() => import("../views/subscription/Subscription"))
);

const Blogs = lazy(() => import("../views/blog/Blogs"));
const BlogCategorys = lazy(() => import("../views/blog/Category"));
const Dashboard1 = lazy(() => import("../views/dashboard/Dashboard"));
const FAQs = lazy(() => import("../views/FAQ/FAQs"));
const Feedbacks = lazy(() => import("../views/feedbacks/Feedbacks"));
const GalleryCategory = lazy(() =>
  import("../views/gallery-category/GalleryCategory")
);
const Gallery = lazy(() => import("../views/gallery/Gallery"));
const VisitorPrayerApplications = lazy(() =>
  import("../views/gust-house/GuestHousePrayerApplications")
);
const PrayerRequests = lazy(() =>
  import("../views/prayer-requests/PrayerRequests")
);
const ServiceCategory = lazy(() =>
  import("../views/service-category/ServiceCategory")
);
const Services = lazy(() => import("../views/services/Services"));

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
          { path: "/subscriptions", exact: true, element: <Subscription /> },
          {
            path: "/teaching-categories",
            exact: true,
            element: <TeachingCategory />,
          },
          { path: "/payments", exact: true, element: <Payments /> },
          { path: "/teaching-sales", exact: true, element: <SamplePage /> },
          { path: "/blog-posts", exact: true, element: <Blogs /> },
          { path: "/blog-categories", exact: true, element: <BlogCategorys /> },
          { path: "/services", exact: true, element: <Services /> },

          {
            path: "/service-categories",
            exact: true,
            element: <ServiceCategory />,
          },
          { path: "/gallery-posts", exact: true, element: <Gallery /> },
          {
            path: "/gallery-categories",
            exact: true,
            element: <GalleryCategory />,
          },

          { path: "/feedbacks", exact: true, element: <Feedbacks /> },
          {
            path: "/frequently-asked-questions",
            exact: true,
            element: <FAQs />,
          },
          {
            path: "/prayer-requests",
            exact: true,
            element: <PrayerRequests />,
          },
          {
            path: "/visitors-applications",
            exact: true,
            element: <VisitorPrayerApplications />,
          },
          { path: "/feedbacks", exact: true, element: <Feedbacks /> },
          {
            path: "/frequently-asked-questions",
            exact: true,
            element: <FAQs />,
          },
          { path: "/gifts", exact: true, element: <SamplePage /> },
          // { path: "/payments", exact: true, element: <Payments /> },
          // { path: "/payments", exact: true, element: <Payments /> },
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
