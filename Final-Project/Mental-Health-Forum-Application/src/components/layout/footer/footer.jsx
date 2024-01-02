import { Footer as FlowFooter } from "flowbite-react";
import { Facebook, Instagram, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <FlowFooter container className="bg-dark-navy dark:bg-dark-navy text-white ">
      <div className="w-full text-center">
        <div className="max-w-7xl flex flex-row items-end  mx-auto justify-between sm:flex sm:items-start sm:justify-between -mt-2">
          <div className="">
            <FlowFooter.Title className="text-white flex items-center md:items-start justify-start md:justify-normal text-sm sm:text-lg" title="Health Haven Forum" />
            <FlowFooter.LinkGroup col className="text-white flex items-start mb-2 md:mb-0 -mt-3">
              <FlowFooter.Link href="#">About</FlowFooter.Link>
              <FlowFooter.Link href="#">Articles</FlowFooter.Link>
              <FlowFooter.Link href="#">Contact</FlowFooter.Link>
            </FlowFooter.LinkGroup>
          </div>
          <div className="">
            <FlowFooter.Title className="text-white flex justify-start md:justify-normal items-start md:items-start" title="Useful Info" />
            <FlowFooter.LinkGroup col className="text-white flex items-start md:items-start mb-2 md:mb-0 -mt-3">
              <FlowFooter.Link href="#">Terms & Rules</FlowFooter.Link>
              <FlowFooter.Link href="#">Privacy Policy</FlowFooter.Link>
            </FlowFooter.LinkGroup>
          </div>
          <div className="">
            <FlowFooter.Title className="text-white flex items-center md:items-start justify-start md:justify-normal" title="Contact Us" />
            <FlowFooter.LinkGroup className="text-white flex  items-center md:items-start mb-2 md:mb-0 -mt-3">
              <FlowFooter.Link href="#">
                <Linkedin size={18} className="text-gray-300 hover:opacity-80  transition duration-300 ease-in-out" />
              </FlowFooter.Link>
              <FlowFooter.Link href="#">
                <Facebook size={18} className="text-gray-300 hover:opacity-80 transition duration-300 ease-in-out" />
              </FlowFooter.Link>
              <FlowFooter.Link href="#">
                <Instagram size={18} className="text-gray-300 hover:opacity-80 transition duration-300 ease-in-out" />
              </FlowFooter.Link>
              <FlowFooter.Link href="#">
                <Mail size={18} className="text-gray-300 hover:opacity-80 transition duration-300 ease-in-out" />
              </FlowFooter.Link>
            </FlowFooter.LinkGroup>
          </div>
        </div>
        <div className="-my-4">
          <FlowFooter.Divider />
          <FlowFooter.Copyright href="#" by="Group L-D" year={2023} className="text-white" />
        </div>
      </div>
    </FlowFooter>
  );
}
