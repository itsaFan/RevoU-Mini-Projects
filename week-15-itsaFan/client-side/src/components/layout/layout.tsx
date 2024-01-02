import { Layout, Breadcrumb } from "antd";
import PageHeader from "./header";
import Navbar from "./navbar";
import { useContext } from "react";
import classes from "./css/layout.module.css";
import { useState, useEffect } from "react";
import AuthContext from "../../context/auth-context";
import { Outlet } from "react-router-dom";

const { Content } = Layout;

// type Props = {
//   children: ReactNode;
// };

export default function UserLayout() {
  const { currentUser } = useContext(AuthContext);
  const [mediaWidth, setMediaWidth] = useState(window.innerWidth);
  useEffect(() => {
    const autoResize = () => {
      setMediaWidth(window.innerWidth);
    };
    window.addEventListener("resize", autoResize);
    return () => {
      window.removeEventListener("resize", autoResize);
    };
  }, []);

  return (
    <Layout>
      <PageHeader className={classes.header} />
      <Layout>
        {currentUser.username ? <Navbar className={classes.nav} mediaWidth={mediaWidth} /> : null}
        {currentUser.username ? (
          <Layout className={classes.layoutContainer}>
            <Breadcrumb
              className={classes.breadcrumb}
              items={[
                {
                  title: "Home",
                },
                {
                  title: <a href="/dashboard">Dashboard</a>,
                },
              ]}
            />
            <Content className={classes.content}>
              <Outlet />
              {/* {props.children} */}
            </Content>
          </Layout>
        ) : (
          <Content className={classes.content}>
            <Outlet />
            {/* {props.children} */}
          </Content>
        )}
      </Layout>
    </Layout>
  );
}
