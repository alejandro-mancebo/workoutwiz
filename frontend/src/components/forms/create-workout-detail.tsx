import { useState } from "react";
import { useForm } from "react-hook-form";
import { CounterInputForm } from "../form-elements/counter-input-form";

import { Button } from "../buttons";
import { Card } from "../form-elements/card";

export type TWorkoutPlanDetails = {
  exercise: string;
  sets: number;
  repetitions: number;
  weight: number;
  weekDuration: number;
  timesWeek: number;
};

type WorkoutDetailProps = {
  handleOnSubmit: (e: any) => void;
};

export const CreateWorkoutDetail = ({ handleOnSubmit }: WorkoutDetailProps) => {
  const [workoutPlanDetails, setWorkoutPlanDetails] =
    useState<TWorkoutPlanDetails>({
      exercise: "Chest",
      sets: 0,
      repetitions: 0,
      weight: 0,
      weekDuration: 0,
      timesWeek: 0,
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TWorkoutPlanDetails>();

  const onSubmit = handleSubmit((data) => {
    if (data !== undefined) {
      handleOnSubmit(data);
    }
    reset();
    console.log("submitting plan details...", data);
  });

  // const handleSetValue = (detail: any) => {
  //   switch (detail.name) {
  //     case "sets":
  //       setWorkoutPlanDetails((prev) => ({
  //         ...prev,
  //         sets: detail.valueNumber,
  //       }));
  //       break;
  //     case "repetitions":
  //       setWorkoutPlanDetails((prev) => ({
  //         ...prev,
  //         repetitions: detail.valueNumber,
  //       }));
  //       break;
  //     case "weight":
  //       setWorkoutPlanDetails((prev) => ({
  //         ...prev,
  //         weight: detail.valueNumber,
  //       }));
  //       break;
  //     default:
  //   }
  // };

  return (
    <form onSubmit={onSubmit} className="w-[47rem] ">
      <div className="rounded-lg bg-ww-red py-3 text-center text-xl font-medium">
        Week 1 Day Two
      </div>
      <div className="mt-8 flex justify-between">
        <div className="">
          <Card />
        </div>
        <div>
          <div className="grid w-[26rem] grid-cols-3 gap-4">
            <CounterInputForm<TWorkoutPlanDetails>
              id="sets"
              type="number"
              name="sets"
              label="Sets"
              className="mb-2"
              register={register}
              // setIDValueNumber={handleSetValue}
              rules={{ required: "You must enter a number." }}
              errors={errors}
              maxValue={10}
            />
            <CounterInputForm<TWorkoutPlanDetails>
              id="repetitions"
              type="number"
              name="repetitions"
              label="Repetitions"
              className="mb-2"
              register={register}
              // setIDValueNumber={handleSetValue}
              rules={{ required: "You must enter a number." }}
              errors={errors}
              maxValue={10}
            />

            <CounterInputForm<TWorkoutPlanDetails>
              id="weight"
              type="number"
              name="weight"
              label="Weight"
              className="mb-2"
              register={register}
              // setIDValueNumber={handleSetValue}
              rules={{ required: "You must enter a number." }}
              errors={errors}
              maxValue={100}
              unit="lbs"
            />

            <CounterInputForm<TWorkoutPlanDetails>
              id="weekDuration"
              type="number"
              name="weekDuration"
              label="Week Duration"
              className="mb-2"
              register={register}
              // setIDValueNumber={handleSetValue}
              rules={{ required: "You must enter a number." }}
              errors={errors}
              maxValue={16}
            />
            <CounterInputForm<TWorkoutPlanDetails>
              id="timesWeek"
              type="number"
              name="timesWeek"
              label="Times Week"
              className="mb-2"
              register={register}
              // setIDValueNumber={handleSetValue}
              rules={{ required: "You must enter a number." }}
              errors={errors}
              maxValue={16}
            />
          </div>
          <div className="mt-10">
            <Button type="submit">Create</Button>
          </div>
        </div>
      </div>
    </form>
  );
};
