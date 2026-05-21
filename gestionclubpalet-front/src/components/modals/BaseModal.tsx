import React from "react";

interface IProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  variant?: "base" | "infos" | "delete";
  maxWidth: string;
}

const variants = {
  base: "bg-overlay/30",
  infos: "bg-overlay/30",
  delete: "bg-overlay/80 cursor-default",
};
export default function BaseModal({
  children,
  onClick,
  variant = "base",
  maxWidth,
}: IProps) {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${variants[variant]}`}
      onClick={onClick}
    >
      <div
        className={`bg-background rounded-xl shadow-2xl border border-border w-full mx-8 ${maxWidth} overflow-hidden ${variant === "base" ? "p-6" : ""}`}
      >
        {children}
      </div>
    </div>
  );
}
