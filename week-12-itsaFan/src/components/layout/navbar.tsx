import { LogoutOutlined, ProjectOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useState, useEffect } from "react";
import type { MenuProps } from 'antd';

type Props = {
  className?: string;
  mediaWidth: number;
};

const { Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const navItems: MenuItem[] = [
  getItem('Account', '1', <UserOutlined />),
  getItem('Projects', '2', <ProjectOutlined />),

  getItem('Setting', 'sub1', <SettingOutlined />, [
    getItem('Profile', '3'),
    getItem('Avatar', '4'),
    getItem('Privacy', '5'),
  ]),
  getItem('Logout', '6', <LogoutOutlined />),

];

export default function Navbar({ className, mediaWidth }: Props) {
  const [collapsed, setCollapsed] = useState(mediaWidth < 900);
  const [siderWidth, setSiderWidth] = useState(mediaWidth < 500);

  useEffect(() => {
    setCollapsed(mediaWidth < 900)
    setSiderWidth(mediaWidth < 500)
  }, [mediaWidth])


  return (
    <Sider 
      collapsible 
      collapsed={collapsed}   
      onCollapse={(value) => setCollapsed(value)} 
      width={siderWidth ? 140 : 250}>
      <Menu 
        mode="inline" 
        className={className} 
        defaultSelectedKeys={["1"]} 
        items={navItems} />
    </Sider>
  );
}
