// import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { InputField } from "./input-element";
import { TextareaField } from "./textarea-element";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// import { CounterInputForm } from "../form-elements/counter-input-form";
import { Button } from "../buttons";

export type WorkoutPlan = {
  planName: string;
  duration: number;
  daysPerWeeks: number;
  startDay: string;
  endDay?: string;
  description?: string;
};

const FormData = z.object({
  planName: z
    .string()
    .min(4, "Plan name can be lest than 4 character")
    .max(25, "Plan name can be greater than 25 character")
    .trim(),
  duration: z.string().transform((val, ctx) => {
    if (val <= "0") {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Invalid value" });
      return z.NEVER;
    }
    return val;
  }),
  daysPerWeeks: z.string().transform((val, ctx) => {
    if (val <= "0") {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Invalid value" });
      return z.NEVER;
    }
    return val;
  }),
  startDay: z.string().min(1, "Please enter the start day"),
  endDay: z.string().optional(),
  description: z.string().optional(),
});

export const CreateWorkoutPlan = () => {
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
  } = useForm<WorkoutPlan>({
    resolver: zodResolver(FormData),
  });

  const onSubmit = handleSubmit((data) => {
    alert("yes");
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
        <InputField
          id="planName"
          type="text"
          label="Plan Name"
          {...register("planName")}
          error={errors.planName?.message}
        />

        <div className="grid grid-cols-2 gap-2">
          <InputField
            id="duration"
            type="number"
            label="Duration"
            defaultValue={0}
            size="counter"
            // className="mb-2 w-24"
            {...register("duration")}
            maxValue={12}
            unit="weeks"
            error={errors.duration?.message}
          />

          <InputField
            id="daysPerWeeks"
            type="number"
            label="Days per weeks"
            defaultValue={0}
            size="counter"
            {...register("daysPerWeeks")}
            maxValue={5}
            error={errors.daysPerWeeks?.message}
          />
        </div>

        <div className="w-80">
          <InputField
            id="startDay"
            type="date"
            label="Start day"
            {...register("startDay")}
            error={errors.startDay?.message}
          />

          <InputField
            id="endDay"
            type="date"
            label="End day"
            {...register("endDay")}
            error={errors.endDay?.message}
          />
        </div>
        <TextareaField
          id="description"
          placeholder="Description"
          className="mb-2"
          {...register("description")}
        />
      </div>
      <div className="mt-10">
        <Button type="submit">Create</Button>
      </div>
    </form>
  );
};
