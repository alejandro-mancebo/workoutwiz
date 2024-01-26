import { NavLink } from "react-router-dom";

export const Navigation = () => {
  return (
    <nav className="ml-16 flex  justify-between bg-ww-nightshade/[.6]">
      {[
        ["Workout", "/workout"],
        ["Progress", "/"],
        ["Community", "home"],
      ].map(([title, url], index) => (
        <NavLink
          key={index}
          className="px-6 pt-3 text-xl font-semibold text-white hover:border-b-4 hover:border-ww-red"
          to={url}
        >
          {title}
        </NavLink>
      ))}
    </nav>
  );
};
