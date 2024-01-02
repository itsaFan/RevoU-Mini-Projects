import UserLayout from "../components/layout/layout";
import classes from "./css/home.module.css";

export default function Homepage() {
  return (
    <UserLayout>
      <div className={classes.main}>
        <h1>Hello &#128075;, Visitor</h1>
        <p>
          To see registration form, click <strong>Register</strong> on the Navbar
        </p>
      </div>
    </UserLayout>
  );
}
