import React from "react";

interface ButtonProps {
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
}

function Button({ onClick, className, children }: ButtonProps) {
  return (
    <button className={`btn ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
