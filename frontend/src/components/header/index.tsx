import { NavLink } from "react-router-dom";
import IMAGES from "../../assets/images";
export const Header = () => {
  return (
    <header className="sticky top-0 bg-ww-nightshade/[.6] text-white z-10 h-[4.5rem] mx-auto px-40 border-b border-ww-red">
      {/* <NavLink to={""}> */}
      <img
        className={`h-14 max-w-full bg-ww-nightshade/[.6]`}
        src={IMAGES.logo.img}
        alt="logo"
      />
      {/* </NavLink> */}
    </header>
  );
};
