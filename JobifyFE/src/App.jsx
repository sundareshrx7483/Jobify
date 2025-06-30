import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  HomeLayout,
  Register,
  Login,
  DashboardLayout,
  Error,
  Landing,
} from "./Pages/index.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
      },
    ],
  },

  {
    path: "/error",
    element: <Error />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
