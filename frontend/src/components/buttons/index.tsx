import { Link } from "react-router-dom";

type ButtonType = "submit" | "reset" | "button" | undefined;
type ButtonProps = {
  children: string;
  type: ButtonType;
};

export const Button = ({ children, type }: ButtonProps) => {
  return (
    <button type={type} className="button w-48">
      {children}
    </button>
  );
};

export const LinkButton = ({ children, link }: any) => {
  return (
    <Link to={link} className="button px-10">
      {children}
    </Link>
  );
};

export const FunctionButton = ({ children, onClick }: any) => {
  return (
    <button type="button" className="button px-8" onClick={onClick}>
      {children}
    </button>
  );
};
