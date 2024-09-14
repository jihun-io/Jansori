import React from "react";
import classNames from "classnames";

const Button = ({
  type = "button",
  variant = "default",
  className = "",
  children,
  onClick,
}) => {
  const baseClasses = "px-4 py-2 rounded-lg font-bold transition-colors";

  const variantClasses = {
    default:
      "bg-supernova-500 hover:bg-supernova-600 active:bg-supernova-700 dark:text-black hover:text-supernova-50 active:text-supernova-50",
    outline:
      "border-solid  border-supernova-700 bg-supernova-50 text-supernova-950 hover:bg-supernova-200 active:bg-supernova-300",
  };

  const buttonClasses = classNames(
    baseClasses,
    variantClasses[variant],
    className
  );

  return (
    <button type={type} className={buttonClasses} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
