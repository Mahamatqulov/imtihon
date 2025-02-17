import { useTheme } from "@/components/theme-provider";

import { FiSun } from "react-icons/fi";
import { FaRegMoon } from "react-icons/fa";

export default function Sidebar() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="z-50 bg-[#373B53] dark:bg-[#1b1e2d] flex justify-between h-[103px] w-full  lg:h-screen lg:w-[103px] lg:rounded-br-3xl lg:rounded-tr-3xl lg:flex lg:flex-col lg:justify-between">
      <img className="sidebar-top" src="../Logo1.svg" alt="" />
      <div className="flex items-center gap-5 lg:flex lg:flex-col lg:gap-5 lg:items-center">
        <button
          onClick={toggleTheme}
          className="text-[#858BB2] hover:text-[#DFE3FA] transition-colors"
        >
          {theme === "dark" ? (
            <FiSun className="text-4xl" />
          ) : (
            <FaRegMoon className="text-4xl" />
          )}
        </button>
        <span className=" bg-slate-500 h-[103px] w-[1px] lg:h-[1px] lg:w-[103px]"></span>
        <img
          className="w-10 h-10 mr-5 lg:mr-0 lg:mb-5"
          src="../Oval.svg"
          alt=""
        />
      </div>
    </div>
  );
}
