import React from "react";

interface IProps {
  type?: "button" | "submit";
  onClick: () => void;
  children: React.ReactNode;
  variant: "confirm" | "cancel" | "delete" | "export";
}

const variants = {
  confirm:
    "bg-btn-confirm text-btn-text border border-btn-confirm hover:brightness-110",
  cancel:
    "bg-btn-cancel text-btn-text-dark border border-border hover:brightness-90",
  delete:
    "bg-btn-delete text-btn-text-light border border-danger hover:brightness-120",
  export:
    "bg-btn-export text-btn-text border border-btn-export hover:brightness-110",
};

export default function Button({
  type = "button",
  onClick,
  variant,
  children,
}: IProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-lg cursor-pointer transition-all ${variants[variant]}`}
    >
      {children}
    </button>
  );
}
