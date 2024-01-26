import { FC, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { FormInput } from "./form-input";
import { FormIncrementDecrement } from "./form-increment-discrement";

import { Button } from "../buttons";

export type RegistrationFormFields = {
  planName: string;
  duration: number;
  daysPerWeeks: number;
  startDay: string;
  endDay?: string;
};

export const emailPattern = {
  value: new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$", "ig"),
  message: "Enter a valid email address.",
};

export const RegistrationForm: FC = () => {
  const [workoutPlan, setWorkoutPlan] = useState<RegistrationFormFields>({
    planName: "",
    duration: 0,
    daysPerWeeks: 0,
    startDay: "",
    endDay: "",
  });

  useEffect(() => {
    console.log("use effect on registration...");
  }, [workoutPlan]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegistrationFormFields>();

  const onSubmit = handleSubmit((data) => {
    setWorkoutPlan((prev) => ({
      ...prev,
      planName: data.planName,
      duration: workoutPlan.duration,
      daysPerWeeks: workoutPlan.daysPerWeeks,
      startDay: data.startDay,
      endDay: data.endDay,
    }));

    console.log("submitting...", workoutPlan);
    return workoutPlan;
  });

  const handleSetValue = (e: any) => {
    //  console.log(`registration form ${e.name}: ${e.valueNumber}`);

    if (e.name == "duration")
      setWorkoutPlan((prev) => ({ ...prev, duration: e.valueNumber }));
    if (e.name == "daysPerWeeks")
      setWorkoutPlan((prev) => ({ ...prev, daysPerWeeks: e.valueNumber }));
    //  console.log("submitting...", workoutPlan);
  };

  return (
    <form onSubmit={onSubmit} className="w-[32rem]">
      <FormInput<RegistrationFormFields>
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

      <Controller
        control={control}
        name="duration"
        render={({
          field: { value, ref },
          fieldState: { error },
          formState,
        }) => (
          <FormIncrementDecrement<RegistrationFormFields>
            id="duration"
            type="text"
            name="duration"
            label="Duration"
            className="mb-2"
            register={register}
            setIDValueNumber={handleSetValue}
            rules={{ required: "You must enter your first name." }}
            errors={errors}
            maxValue={10}
            unit="kg"
          />
        )}
      />

      <FormIncrementDecrement<RegistrationFormFields>
        id="daysPerWeeks"
        type="text"
        name="daysPerWeeks"
        label="Days per weeks"
        className="mb-2"
        register={register}
        setIDValueNumber={handleSetValue}
        rules={{ required: "You must enter the days per weeks." }}
        errors={errors}
        maxValue={5}
      />

      <div className="w-80">
        <FormInput<RegistrationFormFields>
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
        <FormInput<RegistrationFormFields>
          id="endDay"
          type="date"
          name="endDay"
          label="End day"
          placeholder="End day"
          className="mb-2"
          register={register}
          rules={{ required: "You must enter end day." }}
          errors={errors}
        />
      </div>

      {/* <FormTextarea<RegistrationFormFields>
        id="bio"
        name="bio"
        label="Bio"
        placeholder="Enter your bio"
        rows={5}
        register={register}
        errors={errors}
      /> */}
      <Button type="submit">Create</Button>
    </form>
  );
};
