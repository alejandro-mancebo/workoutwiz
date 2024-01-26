import { FC } from "react";
import classNames from "classnames";

export type FormErrorMessageProps = {
  children: string;
  className?: string;
};

export const FormErrorMessage: FC<FormErrorMessageProps> = ({
  children,
  className,
}) => (
  <p
    className={classNames(
      "block text-left font-serif text-sm text-red-600",
      className,
    )}
  >
    {children}
  </p>
);
