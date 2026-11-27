import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

const Button = ({ children, onClick, disabled }: ButtonProps) => {
  return (
    <button
      type="submit"
      className="cursor-pointer rounded-lg bg-gray-900 px-5 py-1 text-white transition-opacity hover:opacity-80 disabled:cursor-not-allowed"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
