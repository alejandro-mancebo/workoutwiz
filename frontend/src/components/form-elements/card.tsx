import React from "react";
import IMAGES from "../../assets/images";

export const Card = () => {
  return (
    <div className="overflow-hidden rounded-xl bg-ww-moonstone">
      <div className="h-[18.75rem] w-[17.5rem] ">
        <img
          className=""
          src={IMAGES.exercise_1.img}
          alt={IMAGES.exercise_1.alt}
        />
      </div>
      <div className="h-14 bg-ww-red py-3 text-center  text-xl font-semibold">
        title
      </div>
    </div>
  );
};
