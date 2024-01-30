import { useState } from "react";
import { useForm } from "react-hook-form";
import { InputField } from "./input-element";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../buttons";
import { Card, CardData } from "./card";
import IMAGES from "../../assets/images";

import {
  FunctionalModalExercise,
  TExercise,
} from "../modal-exercise/functional-modal-exercise";

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

const initialCardData: CardData = {
  src: IMAGES.exercise_1.img,
  alt: IMAGES.exercise_1.alt,
  title: "Bench Press",
};

const FormData = z.object({
  // exercise: z.string(),
  sets: z.string().transform((val, ctx) => {
    if (val <= "0") {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Invalid value" });
      return z.NEVER;
    }
    return val;
  }),
  repetitions: z.string().transform((val, ctx) => {
    if (val <= "0") {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Invalid value" });
      return z.NEVER;
    }
    return val;
  }),
  weight: z.string().transform((val, ctx) => {
    if (val <= "0") {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Invalid value" });
      return z.NEVER;
    }
    return val;
  }),
  weekDuration: z.string().transform((val, ctx) => {
    if (val <= "0") {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Invalid value" });
      return z.NEVER;
    }
    return val;
  }),
  timesWeek: z.string().transform((val, ctx) => {
    if (val <= "0") {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Invalid value" });
      return z.NEVER;
    }
    return val;
  }),
});

export const CreateWorkoutDetail = ({ handleOnSubmit }: WorkoutDetailProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  // const [modalData, setModalData] = useState(exerciseData);

  const [cardData, setCardData] = useState(initialCardData);

  const [workoutPlanDetails, setWorkoutPlanDetails] =
    useState<TWorkoutPlanDetails>({
      exercise: cardData.title,
      sets: 0,
      repetitions: 0,
      weight: 0,
      weekDuration: 0,
      timesWeek: 0,
    });

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleFormSubmit = (data: TExercise) => {
    console.log("Newsletter data", data);
    // console.log("modalData", modalData);
    // setModalData(data);
    setCardData({
      src: data.image_url,
      alt: data.exercise_name + " exercising",
      title: data.exercise_name,
    });
    handleCloseModal();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TWorkoutPlanDetails>({
    resolver: zodResolver(FormData),
  });

  const onSubmit = handleSubmit((data) => {
    let newData: TWorkoutPlanDetails = workoutPlanDetails;
    if (data !== undefined) {
      newData = {
        exercise: cardData.title,
        sets: data.sets,
        repetitions: data.repetitions,
        weight: data.weight,
        weekDuration: data.weekDuration,
        timesWeek: data.timesWeek,
      };
      setWorkoutPlanDetails(newData);
      handleOnSubmit(newData);
    }
    reset();
    console.log("submitting plan details...", newData);
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
    <>
      <form onSubmit={onSubmit} className="w-[47rem] ">
        <div className="rounded-lg bg-ww-red py-3 text-center text-xl font-medium">
          Week 1 Day Two
        </div>
        <div className="mt-8 flex justify-between">
          <div className="">
            <Card cardData={cardData} onClick={handleOpenModal} />
          </div>
          <div>
            <div className="grid w-[26rem] grid-cols-3 gap-4">
              <InputField
                id="sets"
                type="number"
                label="Sets"
                defaultValue={0}
                size="counter"
                {...register("sets")}
                maxValue={10}
                error={errors.sets?.message}
              />
              <InputField
                id="repetitions"
                type="number"
                label="Repetitions"
                defaultValue={0}
                size="counter"
                {...register("repetitions")}
                maxValue={10}
                error={errors.repetitions?.message}
              />

              <InputField
                id="weight"
                type="number"
                label="Weight"
                defaultValue={0}
                size="counter"
                {...register("weight")}
                maxValue={600}
                unit="lbs"
                error={errors.weight?.message}
              />

              <InputField
                id="weekDuration"
                type="number"
                label="Week Duration"
                defaultValue={0}
                size="counter"
                {...register("weekDuration")}
                maxValue={16}
                error={errors.weekDuration?.message}
              />
              <InputField
                id="timesWeek"
                type="number"
                label="Times Week"
                defaultValue={0}
                size="counter"
                {...register("timesWeek")}
                maxValue={16}
                error={errors.timesWeek?.message}
              />
            </div>
            <div className="mt-10">
              <Button type="submit">Create</Button>
            </div>
          </div>
        </div>
      </form>

      <FunctionalModalExercise
        isOpen={isModalOpen}
        onSubmit={handleFormSubmit}
        onClose={handleCloseModal}
      />
    </>
  );
};
