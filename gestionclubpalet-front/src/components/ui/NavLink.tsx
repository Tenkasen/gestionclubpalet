import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface IProps {
  to: string;
  children: ReactNode;
}
export default function NavLink({ to, children }: IProps) {
  return (
    <Link
      to={to}
      className="hover:underline
        hover:text-title text-foreground"
    >
      {children}
    </Link>
  );
}
