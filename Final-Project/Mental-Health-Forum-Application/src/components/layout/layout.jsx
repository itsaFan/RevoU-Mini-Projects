import BreadcrumbNav from "./breadcrumb";
import Footer from "./footer/footer";
import Navbar from "./navbar/navbar";
import { Outlet, useLocation } from "react-router-dom";

export default function Layout() {
  const location = useLocation();
  const isAuthRoute = location.pathname === "/register" || location.pathname === "/login";
  return (
    <div className="min-h-fit  bg-light-theme text-custom-gray dark:bg-main-dark dark:text-white">
      <Navbar />
      <div className="flex flex-col max-w-screen-xl mt-5 mx-auto px-2 lg:px-0 ">
        {!isAuthRoute && (
          <div className="">
            <BreadcrumbNav />
          </div>
        )}
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

// md:sticky md:top-16 md:z-20  breadcrumb class
