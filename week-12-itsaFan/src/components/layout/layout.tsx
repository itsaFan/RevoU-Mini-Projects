import { Layout, Breadcrumb } from "antd";
import PageHeader from "./header";
import Navbar from "./navbar";
import { ReactNode } from "react";
import classes from "./css/layout.module.css";
import PageFooter from "./footer";
import { useState, useEffect } from "react";

const { Content } = Layout;

type Props = {
  children: ReactNode;
};

export default function UserLayout(props: Props) {
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
        <Navbar className={classes.nav} mediaWidth={mediaWidth} />
        <Layout className={classes.layoutContainer}>
          <Breadcrumb
            className={classes.breadcrumb}
            items={[
              {
                title: "Home",
              },
              {
                title: <a href="">Dashboard</a>,
              },
              {
                title: <a href="">Account</a>,
              },
            ]}
          />
          <Content className={classes.content}>{props.children}</Content>
          <PageFooter />
        </Layout>
      </Layout>
    </Layout>
  );
}
