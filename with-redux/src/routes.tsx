import { createBrowserRouter } from "react-router-dom";
import AboutPage from "./components/about/AboutPage";
import App from "./components/App";
import { CoursesPage } from './components/courses/CoursesPage';
import HomePage from "./components/home/HomePage";
import PageNotFound from "./components/PageNotFound";

export const routes = createBrowserRouter([
  {
    /**
     * Set App as the root page.
     * This will set the outlet of the application and then
     * will automatically render the "HomePage" since it has a blank route.
     *
     */
    path: "/",
    element: <App />,
    errorElement: <PageNotFound />,
    id: "app",
    children: [
      {
        path: "/",
        element: <HomePage />,
        index: true
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "courses",
        element: <CoursesPage />,
      },
    ],
  },
]);
