import { SideBarNav } from "@/utils/data";
import { motion, useAnimation } from "framer-motion";
import Logo from "./logo";
import Link from "next/link";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SideBar = () => {
  const controls = useAnimation(); //Stagger children with F motion
  const pathname = usePathname();

  const currentPath = pathname?.split("/")[2];

  //Framer Motion Varient
  const itemsVarient = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  // Update the controls object when open state changes
  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  return (
    <nav
      className={`py-3 transition-all text-white block ease-linear w-full px-1`}
    >
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className={`w-full flex items-center justify-center`}
      >
        <Logo loading={false} showIcon={false} enableColor={false} />
      </motion.div>
      <motion.div
        animate={controls}
        initial={"hidden"}
        variants={{ visible: { transition: { staggerChildren: 0.35 } } }}
        className={`mt-5 flex  relative flex-col gap-10 w-full`}
      >
        {SideBarNav.map((link) => (
          <motion.div className="w-full" variants={itemsVarient} key={link.id}>
            <Link
              passHref
              href={`/app${link.path}`}
              className={`w-full flex  p-2 group ${
                currentPath?.toUpperCase() ===
                  link.name.replace(/\s/g, "").toUpperCase() &&
                "bg-white sideBar-shadow text-blue-600"
              } cursor-pointer rounded-lg hover:bg-blue-50 hover:text-blue-500 hover:font-semibold items-center gap-2`}
            >
              <span className="group-hover:text-blue-500 text-2xl">
                {link.icon}
              </span>
              <p className={`text-lg`}>{link.name}</p>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </nav>
  );
};

export default SideBar;
