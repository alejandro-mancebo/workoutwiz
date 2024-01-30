// import { RegistrationForm } from "../../components/new-forms/registration-form";
// import { CreateWorkoutPlan } from "../../components/forms/create-workout-plan";
// import { WorkoutPlanDetail } from "../../components/forms/workout-plan-detail";
import { CreateWorkoutPlan } from "../../components/input-element/create-workout-plan";
import { WorkoutPlanDetail } from "../../components/input-element/workout-plan-detail";

export const WorkoutPage = () => {
  return (
    <div className="flex justify-between pt-16">
      <CreateWorkoutPlan />
      <WorkoutPlanDetail />
    </div>
  );
};
