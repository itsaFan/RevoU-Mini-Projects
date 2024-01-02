import {  Layout } from "antd";
import itsaFanLogo from "../../assets/images/itsaFan-logo-textRed-transparent-01.png";
import { Link } from "react-router-dom";
import RegisterModal from "../forms/register-modal";

const { Header } = Layout;

type Props = {
  className?: string;
};

export default function PageHeader({ className }: Props) {
  return (
    <Header  className={className}>
      <img src={itsaFanLogo} alt="logo" width={120} height={30}/>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <RegisterModal />
            {/* <Link to="/about">Register</Link> */}
          </li>
          <li>
            <Link to="/contact">Login</Link>
          </li>
        </ul>
      </nav>
    </Header>
  );
}
