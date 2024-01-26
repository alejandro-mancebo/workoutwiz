import { FC, forwardRef, DetailedHTMLProps, InputHTMLAttributes } from "react";

import classNames from "classnames";

export type InputSize = "medium" | "large";
export type InputType = "text" | "email" | "date";

export type InputProps = {
  id: string;
  name: string;
  label: string;
  type?: InputType;
  size?: InputSize;
  className?: string;
} & Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  "size"
>;

// Using maps so that the full Tailwind classes can be seen for purging
// see https://tailwindcss.com/docs/optimizing-for-production#writing-purgeable-html

const sizeMap: { [key in InputSize]: string } = {
  medium: "p-3 text-base",
  large: "p-4 text-base",
};

export const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      name,
      label,
      type,
      size = "medium",
      className = "",
      placeholder,
      value,
      ...props
    },
    ref,
  ) => {
    return (
      <>
        <label htmlFor={id} className="text-lg font-thin">
          {label}
          <input
            id={id}
            ref={ref}
            name={name}
            type={type}
            aria-label={label}
            placeholder={placeholder}
            value={value}
            className={classNames([
              "relative my-2 inline-flex rounded-lg border border-gray-300 bg-gray-50 leading-none text-ww-nightshade placeholder-gray-500 transition-colors ease-in-out hover:border-blue-400 focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-30 ",
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