import { FC, forwardRef, DetailedHTMLProps, InputHTMLAttributes } from "react";
import classNames from "classnames";

export type InputSize = "small" | "medium" | "large";
export type InputType = "number";

export type CounterInputProps = {
  id: string;
  name: string;
  label: string;
  maxValue: number;
  unit?: string;
  // setCounterValue: ({ valueNumber, name }: any) => void;
  type?: InputType;
  size?: InputSize;
  className?: string;
} & Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  "size"
>;

const sizeMap: { [key in InputSize]: string } = {
  small: "text-2xl",
  medium: "text-4xl",
  large: "text-7xl",
};

export const CounterFieldInput: FC<CounterInputProps> = forwardRef<
  HTMLInputElement,
  CounterInputProps
>(
  (
    {
      id,
      name,
      label,
      type,
      size = "medium",
      className = "",
      placeholder,
      maxValue,
      unit,
      // setCounterValue,
      ...props
    },
    ref,
  ) => {
    return (
      <>
        <label className="text-lg font-thin">
          {label} {unit ? "(" + unit + ")" : null}
          <input
            id={id}
            ref={ref}
            name={name}
            type={type}
            defaultValue={0}
            aria-label={label}
            className={classNames([
              "relative my-2 h-14 w-24 rounded-lg border bg-gray-50 pl-4  leading-none text-ww-nightshade placeholder-gray-500 transition-colors ease-in-out hover:border-blue-400 focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-30",
              sizeMap[size],
              className,
            ])}
            {...props}
          />
        </label>
      </>
    );
  },
);
