import { Link } from "react-router-dom";

export const ProgressTracking = () => {
  return (
    <div className="h-[16rem] p-7 ">
      <h2 className=" pb-10 text-center text-4xl font-semibold text-ww-nightshade">
        Progress Tracking
      </h2>
      <ul className="list-disc pl-10 text-2xl">
        {[
          ["Measurement and Comparison", "#"],
          ["Nutrition Tracking", "#"],
        ].map(([title, url]) => (
          <li className="list-disc py-1 text-2xl text-ww-red ">
            <Link
              className="text-xl font-semibold text-ww-nightshade hover:border-b-2 hover:border-ww-red "
              to={url}
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
