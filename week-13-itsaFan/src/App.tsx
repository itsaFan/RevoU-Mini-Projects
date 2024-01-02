import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/landing-page";
import DashboardPage from "./pages/dashboard-page";
import { useContext } from "react";
import AuthContext from "./context/auth-context";
import TaskDetailPage from "./pages/task-detail-page";
import UserLayout from "./components/layout/layout";

function App() {
  const { isLoggedIn } = useContext(AuthContext);

  const router = createBrowserRouter([
    {
      element: <UserLayout />,
      children: [
        {
          path: "/",
          element: <LandingPage />,
        },
        {
          path: "/dashboard",
          element: isLoggedIn ? <DashboardPage /> : <Navigate to="/" />,
        },
        {
          path: "/dashboard/task-detail/:taskId",
          element: isLoggedIn ? <TaskDetailPage /> : <Navigate to="/" />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

// <Routes>
//   <Route path="/" element={<LandingPage />} />

//   {/* Authenticated Routing */}
//   {isLoggedIn && (
//     <>
//     {/* Role auntenticated */}
//       {currentUser.role === "user" && (
//         <>
//           <Route path="/dashboard" element={<DashboardPage />} />
//         </>
//       )}
//     </>
//   )}
// </Routes>
