import { useState, useEffect } from "react";
import classNames from "classnames";
// import get from "lodash.get";

import {
  RegisterOptions,
  DeepMap,
  FieldError,
  UseFormRegister,
  Path,
} from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { CounterFieldInput, CounterInputProps } from "./counter-field-input";
import { FormErrorMessage } from "./form-error-message";

export type FormInputPropsID<TFormValuesID> = {
  name: Path<TFormValuesID>;
  rules?: RegisterOptions;
  register?: UseFormRegister<TFormValuesID>;
  errors?: Partial<DeepMap<TFormValuesID, FieldError>>;
  label: string;
  maxValue: number;
  unit?: string;
} & Omit<CounterInputProps, "name">;

export const CounterInputForm = <
  TFormValuesID extends Record<string, unknown>,
>({
  name,
  register,
  rules,
  errors,
  className,
  label,
  maxValue,
  unit,
  ...props
}: FormInputPropsID<TFormValuesID>): JSX.Element => {
  // const errorMessages = get(errors, name);
  const hasError = "Error"; //!!(errors && errorMessages);

  // const [valueNumber, setValueNumber] = useState([]);

  // useEffect(() => {
  //   console.log(`useEffect CounterInputForm: [${name}, ${valueNumber}]`);
  // }, [valueNumber]);

  return (
    <div className={classNames("", className)} aria-live="polite">
      <CounterFieldInput
        name={name}
        label={label}
        // aria-invalid={hasError}
        className={classNames({
          "  flex w-32 border-red-600 text-center font-light leading-none transition-colors hover:border-red-600 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50":
            hasError,
        })}
        maxValue={maxValue}
        unit={unit}
        {...props}
        {...(register && register(name, rules))}
        // setCounterValue={setValueNumber}
      />
      <ErrorMessage
        errors={errors}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        name={name as any}
        render={({ message }) => (
          <FormErrorMessage className="mt-1">{message}</FormErrorMessage>
        )}
      />
    </div>
  );
};
