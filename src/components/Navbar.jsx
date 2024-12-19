import { useState } from "react";
import Image from "./Image";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user } = useUser();

  const isAdmin = user?.publicMetadata?.role === "admin" || false;

  return (
    <div className="w-full h-16 md:h-20 flex items-center justify-between">
      {/* DESKTOP MENU */}
      <div className="hidden md:flex items-center gap-8 xl:gap-4 font-medium">
        <SignedOut>
          <Link to="/login">
            <button className="flex justify-between px-3 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition duration-300">
              تسجيل الدخول
            </button>
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>

        <Link to="/" className="relative px-3 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition duration-300">الرئيسية</Link>
        {/* <Link to="/posts?sort=trending" className="relative px-3 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition duration-300">الشائع</Link> */}
        <Link to="/posts?sort=popular" className="relative px-3 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition duration-300">الأكثر مشاهدة</Link>
        <Link to="About" className="relative px-3 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition duration-300">عن الجمعية</Link>
        <Link to="Contact" className="relative px-3 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition duration-300">تواصل معنا</Link>
        {isAdmin && (
          <Link to="write" className="relative px-3 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition duration-300">انشر</Link>
        )}
      </div>

      {/* MOBILE MENU */}
      <div className="md:hidden">
        {/* MOBILE BUTTON */}
        <div
          className="cursor-pointer text-4xl"
          onClick={() => setOpen((prev) => !prev)}
        >
          {/* Change Hamburger Icon */}
          {/* {open ? "X" : "☰"} */}
          <div className="flex flex-col gap-[5.4px]">
            <div
              className={`h-[3px] rounded-md w-6 bg-black origin-left transition-all ease-in-out ${open && "rotate-45"
                }`}
            ></div>
            <div
              className={`h-[3px] rounded-md w-6 bg-black transition-all ease-in-out ${open && "opacity-0"
                }`}
            ></div>
            <div
              className={`h-[3px] rounded-md w-6 bg-black origin-left transition-all ease-in-out ${open && "-rotate-45"
                }`}
            ></div>
          </div>
        </div>
        {/* MOBILE LINK LIST */}
        <div
          className={`w-full h-screen bg-[#e6e6ff] flex flex-col items-center justify-center gap-8 font-medium text-lg absolute top-16 transition-all ease-in-out ${open ? "-right-0" : "-right-[100%]"
            }`}
        >
          <Link to="/" onClick={() => setOpen(false)}>الرئيسية</Link>
          <Link to="/posts?sort=popular" onClick={() => setOpen(false)}>الأكثر مشاهدة</Link>
          <Link to="About" onClick={() => setOpen(false)}>عن الجمعية</Link>
          <Link to="Contact" onClick={() => setOpen(false)}>تواصل معنا</Link>
          {isAdmin && (
            <Link to="write" onClick={() => setOpen(false)}>انشر</Link>
          )}
          {/* <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/posts?sort=trending" onClick={() => setOpen(false)}>Trending</Link>
          <Link to="/posts?sort=popular" onClick={() => setOpen(false)}>Most Popular</Link>
          <Link to="/" onClick={() => setOpen(false)}>About</Link> */}
          <Link to="/login" onClick={() => setOpen(false)}>
            <button className="flex justify-between px-3 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition duration-300">
              تسجيل الدخول
            </button>
          </Link>
        </div>
      </div>

      {/* LOGO */}
      <Link to="/" className="flex items-center gap-4 text-2xl font-bold">
        <Image
          src="logo.png"
          alt="جمعية حي الزهور"
          // w={100}
          // h={100}
          className="w-24 h-24 rounded-full object-cover mt-4"
        />
      </Link>

    </div>
  );
};

export default Navbar;
