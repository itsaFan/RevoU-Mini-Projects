import { Footer } from "flowbite-react";
import { BsFacebook, BsGithub, BsInstagram, BsLinkedin } from "react-icons/bs";

export default function FooterLayout() {
  return (
    <Footer container className="bottom-0 shadow-neutral-700">
      <div className="w-full text-center">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <Footer.Brand />
          <Footer.LinkGroup>
            <Footer.Link href="#">Footer 1</Footer.Link>
            <Footer.Link href="#">Footer 2</Footer.Link>
            <Footer.Link href="#">Footer 3</Footer.Link>
            <Footer.Link href="#">Footer 4</Footer.Link>
          </Footer.LinkGroup>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright by=", Steffansim" year={2023} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="https://www.linkedin.com/in/steffansim/" icon={BsLinkedin} />
            <Footer.Icon href="https://github.com/itsaFan" icon={BsGithub} />
          </div>
        </div>
      </div>
    </Footer>
  );
}
