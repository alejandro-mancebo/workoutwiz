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
import {
  InputIncrementDecrement,
  InputProps,
} from "./input-Increment-decrement";
import { FormErrorMessage } from "./form-error-message";

export type FormInputPropsID<TFormValuesID> = {
  name: Path<TFormValuesID>;
  rules?: RegisterOptions;
  register?: UseFormRegister<TFormValuesID>;
  errors?: Partial<DeepMap<TFormValuesID, FieldError>>;
  label: string;
  maxValue: number;
  unit?: string;
} & Omit<InputProps, "name">;

export const FormIncrementDecrement = <
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
  // If the name is in a FieldArray, it will be 'fields.index.fieldName' and errors[name] won't return anything, so we are using lodash get
  // const errorMessages = get(errors, name);
  const hasError = "Error"; //!!(errors && errorMessages);

  const [valueNumber, setValueNumber] = useState([]);

  useEffect(() => {
    console.log(`useEffect parent ${name} ${valueNumber}`);
  }, [valueNumber]);

  return (
    <>
      <p className="text-lg font-thin">
        {label} {unit ? "(" + unit + ")" : null}
      </p>
      <div className={classNames("", className)} aria-live="polite">
        <InputIncrementDecrement
          name={name}
          label={label}
          setIDValueNumber={setValueNumber}
          // aria-invalid={hasError}
          className={classNames({
            " mx-2 flex w-32 border-red-600 py-1.5 text-center  text-xl leading-none transition-colors hover:border-red-600 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50":
              hasError,
          })}
          maxValue={maxValue}
          {...props}
          {...(register && register(name, rules))}
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
    </>
  );
};
