import React from "react";

interface IProps {
  type?: "button" | "submit";
  onClick?: () => void;
  children: React.ReactNode;
  variant:
    | "confirm"
    | "cancel"
    | "delete"
    | "export"
    | "previousPlayer"
    | "nextPlayer"
    | "save";
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
  previousPlayer:
    "flex-1 bg-foreground-subtle/15 text-foreground hover:bg-foreground-subtle/30 disabled:opacity-40 disabled:cursor-not-allowed text-sm font-medium",
  nextPlayer:
    "flex-1 bg-btn-confirm text-btn-text hover:bg-btn-confirm/80 disabled:opacity-40 disabled:cursor-not-allowed text-sm font-medium",
  save: "w-full flex justify-center items-center gap-4 bg-btn-save text-btn-text hover:brightness-85 font-medium",
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
