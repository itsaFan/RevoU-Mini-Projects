import { Facebook, Instagram, Link, Linkedin, Mail, Share2 } from "lucide-react";
import StatsCard from "../ui/stats-card";

export default function SocialInfo() {
  return (
    <StatsCard title="Our Social Media" icon={<Share2 size={20} />}>
      <div className="flex gap-4 justify-center">
        <Linkedin size={22} className="text-gray-600 hover:text-main-dark transition duration-300 ease-in-out" />
        <Facebook size={22} className="text-gray-600 hover:text-main-dark transition duration-300 ease-in-out" />
        <Instagram size={22} className="text-gray-600 hover:text-main-dark transition duration-300 ease-in-out" />
        <Mail size={22} className="text-gray-600 hover:text-main-dark transition duration-300 ease-in-out" />
        <Link size={22} className="text-gray-600 hover:text-main-dark transition duration-300 ease-in-out" />
      </div>
    </StatsCard>
  );
}
