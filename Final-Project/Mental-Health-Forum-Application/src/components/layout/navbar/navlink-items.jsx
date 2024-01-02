import { NavLink } from "react-router-dom";

export default function NavLinks() {
  return (
    <>
      <NavLink className="hover:opacity-80 hover:underline underline-offset-4 transition duration-150 ease-in-out" to="">
        Home
      </NavLink>
      <NavLink className="hover:opacity-80 hover:underline underline-offset-4 transition duration-150 ease-in-out" to="">
        Articles
      </NavLink>
      <NavLink className="hover:opacity-80 hover:underline underline-offset-4 transition duration-150 ease-in-out" to="">
        Contact
      </NavLink>
      <NavLink className="hover:opacity-80 hover:underline underline-offset-4 transition duration-150 ease-in-out" to="">
        Feedback
      </NavLink>
    </>
  );
}
