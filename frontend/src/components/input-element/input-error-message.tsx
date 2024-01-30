import classNames from "classnames";

export type ErrorMessageProps = {
  children?: string;
  className?: string;
};

export const InputErrorMessage = ({
  children,
  className,
}: ErrorMessageProps) => (
  <>
    {children && (
      <p
        className={classNames(
          "block text-left text-base text-ww-red-600",
          className,
        )}
      >
        {children}
      </p>
    )}
  </>
);
