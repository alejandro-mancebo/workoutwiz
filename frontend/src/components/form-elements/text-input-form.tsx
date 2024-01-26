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
import { TextFieldInput, TextInputProps } from "./text-field-input";
import { FormErrorMessage } from "./form-error-message";

export type InputFormProps<TextFormValues> = {
  name: Path<TextFormValues>;
  rules?: RegisterOptions;
  register?: UseFormRegister<TextFormValues>;
  errors?: Partial<DeepMap<TextFormValues, FieldError>>;
} & Omit<TextInputProps, "name">;

export const TextInputForm = <TextFormValues extends Record<string, unknown>>({
  name,
  register,
  rules,
  errors,
  className,
  ...props
}: InputFormProps<TextFormValues>): JSX.Element => {
  // const errorMessages = get(errors, name);
  const hasError = "Error"; //!!(errors && errorMessages);

  return (
    <div className={classNames("", className)} aria-live="polite">
      <TextFieldInput
        name={name}
        // aria-invalid={hasError}
        className={classNames({
          "w-full border-red-600 transition-colors hover:border-red-600 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50":
            hasError,
        })}
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
  );
};
