import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { TextInputForm } from "../form-elements/text-input-form";
import { CounterInputForm } from "../form-elements/counter-input-form";
import { Button } from "../buttons";

export type WorkoutPlan = {
  planName: string;
  duration: number;
  daysPerWeeks: number;
  startDay: string;
  endDay?: string;
  description?: string;
};

export const CreateWorkoutPlan: FC = () => {
  // const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan>({
  //   planName: "",
  //   duration: 0,
  //   daysPerWeeks: 0,
  //   startDay: "",
  //   endDay: "",
  // });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<WorkoutPlan>();

  const onSubmit = handleSubmit((data) => {
    console.log("data submitting...", data);
    reset();
  });

  // const handleSetValue = (plan: any) => {
  //   if (plan.name == "duration") {
  //     setWorkoutPlan((prev) => ({ ...prev, duration: plan.valueNumber }));
  //     console.log("workoutPlan.duration", workoutPlan.duration);
  //   }

  //   if (plan.name == "daysPerWeeks")
  //     setWorkoutPlan((prev) => ({ ...prev, daysPerWeeks: plan.valueNumber }));
  // };

  return (
    <form onSubmit={onSubmit} className="w-[24rem]">
      <h2 className=" pb-10 text-center text-4xl font-semibold text-white">
        Workout Plan
      </h2>
      <div>
        <TextInputForm<WorkoutPlan>
          id="planName"
          type="text"
          name="planName"
          label="Plan Name"
          placeholder="Plan name"
          className="mb-2"
          register={register}
          rules={{ required: "You must enter the plan name" }}
          errors={errors}
        />

        <div className="grid grid-cols-2 gap-2">
          <CounterInputForm<WorkoutPlan>
            id="duration"
            type="number"
            name="duration"
            label="Duration"
            className="mb-2"
            register={register}
            // setCounterValue={handleSetValue}
            rules={{ required: "You must enter your first name." }}
            errors={errors}
            maxValue={12}
            unit="weeks"
          />

          <CounterInputForm<WorkoutPlan>
            id="daysPerWeeks"
            type="number"
            name="daysPerWeeks"
            label="Days per weeks"
            className="mb-2"
            register={register}
            // setCounterValue={handleSetValue}
            rules={{ required: "You must enter the days per weeks." }}
            errors={errors}
            maxValue={5}
          />
        </div>

        <div className="w-80">
          <TextInputForm<WorkoutPlan>
            id="startDay"
            type="date"
            name="startDay"
            label="Start day"
            placeholder="Start day"
            className="mb-2"
            register={register}
            rules={{
              required: "You must enter start day.",
            }}
            errors={errors}
          />
          <TextInputForm<WorkoutPlan>
            id="endDay"
            type="date"
            name="endDay"
            label="End day"
            placeholder="End day"
            className="mb-2"
            register={register}
            // rules={{ required: "You must enter end day." }}
            errors={errors}
          />

          <TextInputForm<WorkoutPlan>
            id="description"
            type="text"
            name="description"
            label="Description"
            placeholder="Description"
            className="mb-2"
            register={register}
            // rules={{ required: "You must enter the plan name" }}
            errors={errors}
          />
        </div>
      </div>
      <div className="mt-10">
        <Button type="submit">Create</Button>
      </div>
    </form>
  );
};
