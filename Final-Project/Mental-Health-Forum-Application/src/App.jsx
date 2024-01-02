import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout/layout";
import ForumPage from "./pages/forums-page";
import UserProfileForm from "./components/userProfile/userProfile";
import RegisterPage from "./pages/register-page";
import LoginPage from "./pages/login-page";
import ForumDetailPage from "./pages/forum-detail-page";
import PostPage from "./pages/post-page";
import SearchResultPage from "./pages/search-page";

function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <ForumPage />,
        },
        {
          path: "/forum/:title/:forumId/:page",
          element: <ForumDetailPage />,
        },
        {
          path: "/forum/post/:postTitle/:postPage",
          element: <PostPage />,
        },
        {
          path: "/search/:query/:searchPage",
          element: <SearchResultPage />,
        },
        {
          path: "/register",
          element: <RegisterPage />,
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/userProfile",
          element: <UserProfileForm />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
