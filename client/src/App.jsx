import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  HomeLayout,
  Register,
  Login,
  DashboardLayout,
  Error,
  Landing,
  AddJob,
  Stats,
  AllJobs,
  Profile,
  Admin,
} from "./Pages/index.js";
import { action as registerAction } from "./Pages/Register.jsx";
import { action as loginAction } from "./Pages/Login.jsx";
import { loader as dashboardLoader } from "./Pages/DashboardLayout.jsx";
import { action as addJobAction } from "./Pages/AddJob.jsx";
import { loader as allJobsLoader } from "./Pages/AllJobs.jsx";
import { loader as statsLoader } from "./Pages/Stats.jsx";
import { action as profileAction } from "./Pages/Profile.jsx";
import { action as deleteJobAction } from "./Pages/DeleteJob.jsx";
import { loader as adminLoader } from "./Pages/Admin.jsx";
export const checkIsDarkTheme = () => {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};
checkIsDarkTheme();

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <AddJob />,
            action: addJobAction,
          },
          {
            path: "stats",
            element: <Stats />,
            loader: statsLoader,
          },
          {
            path: "all-jobs",
            element: <AllJobs />,
            loader: allJobsLoader,
          },
          {
            path: "profile",
            element: <Profile />,
            action: profileAction,
          },
          {
            path: "admin",
            element: <Admin />,
            loader: adminLoader,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
