import { Link } from "react-router-dom";

export const WorkoutPlan = () => {
  return (
    <div className="h-[18rem] p-7 ">
      <h2 className=" pb-10 text-center text-4xl font-semibold text-ww-nightshade">
        Workout Plan
      </h2>
      <ul className="list-disc pl-10 text-2xl">
        {[
          ["Create plan", "/workout"],
          ["Modify plan", "/modify-plan"],
          ["Delete plan", "/home"],
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
