import { forwardRef, InputHTMLAttributes } from "react";
import classNames from "classnames";
import { InputErrorMessage } from "./input-error-message";

export type InputSize = "small" | "medium" | "large" | "counter";
export type InputType = "text" | "date" | "number";

export type InputProps = {
  id: string;
  name: string;
  label: string;
  type?: InputType;
  size?: InputSize;
  maxValue?: number;
  unit?: string;
  className?: string;
  error?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "size">;

export const InputField = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      label,
      name,
      type,
      size = "small",
      maxValue,
      unit,
      className,
      error,
      onChange,
      ...inputParams
    },
    ref,
  ) => {
    const SIZE = `py-3 ${type == "date" ? "w-fix" : "w-full"} p-3`;
    const sizeMap: { [key in InputSize]: string } = {
      small: "text-xl " + SIZE,
      medium: "text-3xl " + SIZE,
      large: "text-5xl " + SIZE,
      counter: "text-5xl w-32 pl-4 text-center font-light",
    };

    return (
      <div className="mb-3">
        <label htmlFor={id} className=" text-lg font-thin">
          {label} {unit ? "(" + unit + ")" : null}{" "}
        </label>
        <input
          ref={ref}
          id={id}
          name={name}
          type={type}
          min={maxValue && 0}
          max={maxValue && maxValue}
          placeholder={type === "number" ? "0" : label}
          aria-label={label}
          className={classNames([
            "my-2  block rounded-lg  border border-ww-red bg-ww-moonstone-900  leading-none text-ww-nightshade placeholder-ww-moonstone-200 transition-colors ease-in-out hover:bg-ww-pumpkin-900 focus:border-ww-red-300 focus:outline-none focus:ring-4 focus:ring-ww-red-300 focus:ring-opacity-30",
            sizeMap[size],
            className,
          ])}
          {...inputParams}
        />

        {/* {type !== "number" ? ( */}
        <InputErrorMessage>{error}</InputErrorMessage>
        {/* ) : null} */}
      </div>
    );
  },
);
