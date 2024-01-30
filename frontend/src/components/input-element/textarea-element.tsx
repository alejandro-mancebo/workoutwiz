import { forwardRef, TextareaHTMLAttributes } from "react";
import classNames from "classnames";

export type TextareaSize = "small" | "medium" | "large";

export type TextareaProps = {
  id: string;
  name: string;
  label?: string;
  size?: TextareaSize;
  className?: string;
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size">;

export const TextareaField = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      id,
      label,
      name,
      size = "medium",
      maxLength = 255,
      className,
      ...inputParams
    },
    ref,
  ) => {
    const sizeMap: { [key in TextareaSize]: string } = {
      small: "h-24",
      medium: "h-36",
      large: "h-48",
    };

    return (
      <div className="mt-8">
        {label && (
          <label htmlFor={id} className=" text-lg font-thin">
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          id={id}
          name={name}
          maxLength={maxLength}
          placeholder={label}
          aria-label={label}
          className={classNames([
            "my-2 block w-full  resize-none rounded-xl border border-ww-red bg-ww-moonstone-900 py-4 pl-4 pr-2 text-base  leading-normal text-ww-nightshade placeholder-ww-moonstone-200 transition-colors ease-in-out hover:bg-ww-pumpkin-900 focus:border-ww-red-300 focus:outline-none focus:ring-4 focus:ring-ww-red-300 focus:ring-opacity-30 disabled:border-0 ",
            sizeMap[size],
            className,
          ])}
          {...inputParams}
        />
      </div>
    );
  },
);
