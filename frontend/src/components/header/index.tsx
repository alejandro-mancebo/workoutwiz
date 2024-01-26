import { NavLink } from "react-router-dom";
import IMAGES from "../../assets/images";
import { Navigation } from "./navigation";

export const Header = () => {
  return (
    <header className="sticky top-0 mx-auto flex h-[4.5rem] items-center justify-between border-b border-ww-red bg-ww-nightshade/[.6] px-40 text-center text-white ">
      <div className="flex">
        <NavLink to={"/"}>
          <img
            className="h-14 max-w-full cursor-pointer bg-ww-nightshade/[.6] "
            src={IMAGES.logo.img}
            alt="logo"
          />
        </NavLink>
        <Navigation />
      </div>
      <div className="flex bg-ww-nightshade/[.6]">
        <div className=" text-xl text-white ">
          <p>Lazaro</p>
        </div>
        <div className="mx-6 rounded-full border border-ww-red bg-ww-moonstone ">
          <p className="size-8  text-xl font-bold text-ww-nightshade">{"M"}</p>
        </div>
        <div className="text-xl font-semibold  text-white  hover:text-ww-red">
          <NavLink className="" to={"/"}>
            Logout
          </NavLink>
        </div>
      </div>
    </header>
  );
};
