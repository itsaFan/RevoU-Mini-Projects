import { Dropdown, Avatar } from "flowbite-react";
import LogoutBtn from "../../ui/logout.btn";
import { useAuth } from "../../../context/use-context";
import { convertToInitial } from "../../../utils/helper-converter";

export default function DropdownNavItems() {
  const { userPayload, isLoggedIn } = useAuth();
  const username = userPayload?.username;

  return (
    <Dropdown arrowIcon={false} inline label={<Avatar alt="User settings" rounded placeholderInitials={username ? convertToInitial(username) : ""} className="hover:opacity-80" />} className="dark:bg-sub-dark w-32 ">
      {isLoggedIn ? (
        <>
          <Dropdown.Header className="mr-5 flex gap-1">
            <span className="font-semibold">{username ? username.charAt(0).toUpperCase() + username.slice(1) : ""}</span>
          </Dropdown.Header>
          <Dropdown.Item>Profile</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>
            <LogoutBtn />
          </Dropdown.Item>
        </>
      ) : (
        <>
          <Dropdown.Item href="/login">Login</Dropdown.Item>
          <Dropdown.Item href="/register">Register</Dropdown.Item>
        </>
      )}
    </Dropdown>
  );
}
