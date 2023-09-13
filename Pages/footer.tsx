import Logo from "@/Components/logo";
import { Links } from "@/utils/data";
import Link from "next/link";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full h-fit footer-bg md:h-[50vh] mt-3">
      <div className="px-3 gap-4 md:gap-0 flex md:flex-row flex-col md:justify-between text-white py-2">
        <div>
          <Logo enableColor={false} showIcon={true} loading={false} />
          <p className="text-xl">Connect anything.</p>
          <strong className="text-lg">&copy; {year}</strong>
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl">Quick Links</h2>
          <div className="flex flex-col gap-2">
            {Links.map((link) => (
              <a className="text-gray-300" key={link.id} href={link.path}>
                {link.name}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl">Our Website.</h2>
          <div className="text-gray-300 flex flex-col gap-3">
            <Link href={"/"} passHref>
              Sign Up
            </Link>
            <Link href={"/"} passHref>
              Login
            </Link>
            <Link href={"/"} passHref>
              API
            </Link>
            <a href="mailto:suleimaangee@gmail.com">
              Connect with the developer
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
