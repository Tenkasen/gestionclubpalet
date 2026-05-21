import React from "react";

interface IProps {
  type?: "button" | "submit";
  onClick?: () => void;
  children: React.ReactNode;
  variant: "confirm" | "cancel" | "delete" | "export";
  disabled?: boolean;
}

const variants = {
  confirm:
    "bg-btn-confirm text-btn-text-light border border-btn-confirm-border hover:opacity-80",
  cancel:
    "bg-btn-cancel  text-btn-text-dark  border border-btn-cancel-border  hover:brightness-90",
  delete:
    "bg-btn-delete  text-btn-text-light border border-btn-delete-border  hover:opacity-70",
  export:
    "bg-btn-export  text-btn-text-light border border-btn-export-border  hover:brightness-110",
};

export default function Button({
  type = "button",
  onClick,
  variant,
  children,
  disabled,
}: IProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-lg cursor-pointer transition-all ${variants[variant]}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
