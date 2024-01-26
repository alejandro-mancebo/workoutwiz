import { WorkoutPlan } from "../../components/dashboard/workout-plan";
import { Calendar } from "../../components/dashboard/calendar";
import { ExerciseLibrary } from "../../components/dashboard/exercise-library";
import { ProgressTracking } from "../../components/dashboard/progress-tracking";

export const HomePage = () => {
  return (
    <section className=" pt-14 ">
      <div className="grid-flows-row grid grid-cols-2 gap-8 ">
        <div className="rounded-2xl border border-ww-red bg-ww-moonstone">
          <WorkoutPlan />
        </div>
        <div className=" row-span-2 rounded-2xl border border-ww-red bg-ww-moonstone">
          <Calendar />
        </div>
        <div className=" row-span-2 rounded-2xl border border-ww-red bg-ww-moonstone">
          <ExerciseLibrary />
        </div>
        <div className="  rounded-2xl border border-ww-red bg-ww-moonstone">
          <ProgressTracking />
        </div>
      </div>
    </section>
  );
};
