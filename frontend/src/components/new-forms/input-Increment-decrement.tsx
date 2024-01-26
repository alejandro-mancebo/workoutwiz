import {
  FC,
  useState,
  useEffect,
  forwardRef,
  DetailedHTMLProps,
  InputHTMLAttributes,
} from "react";
import classNames from "classnames";
import { FunctionButton } from "../buttons";

export type InputSize = "medium" | "large";
export type InputType = "text";

export type InputProps = {
  id: string;
  name: string;
  label: string;
  maxValue: number;
  setIDValueNumber: ([value]: any) => void;
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

export const InputIncrementDecrement: FC<InputProps> = forwardRef<
  HTMLInputElement,
  InputProps
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
      setIDValueNumber,
      ...props
    },
    ref,
  ) => {
    const [valueNumber, setValueNumber] = useState(0);

    useEffect(() => {
      setIDValueNumber({ valueNumber, name });
      console.log(`useEffect ${name}: ${valueNumber}`);
    }, [valueNumber]);

    const handleDecrementNumber = () => {
      if (valueNumber - 1 < 0) {
        setValueNumber(0);
        return;
      }
      setValueNumber(valueNumber - 1);
    };

    const handelIncrementNumber = () => {
      if (valueNumber >= maxValue) {
        setValueNumber(maxValue);
        return;
      }
      setValueNumber(valueNumber + 1);
    };

    return (
      <>
        <FunctionButton type="button" onClick={handleDecrementNumber}>
          -
        </FunctionButton>

        <input
          id={id}
          ref={ref}
          name={name}
          type={type}
          aria-label={label}
          value={valueNumber}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setValueNumber(parseInt(e.target.value))
          }
          className={classNames([
            "relative my-2 inline-flex rounded-lg border border-gray-300 bg-gray-50 leading-none text-ww-nightshade placeholder-gray-500 transition-colors ease-in-out hover:border-blue-400 focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-30 ",
            sizeMap[size],
            className,
          ])}
          {...props}
        />

        <FunctionButton type="button" onClick={handelIncrementNumber}>
          +
        </FunctionButton>
      </>
    );
  },
);
