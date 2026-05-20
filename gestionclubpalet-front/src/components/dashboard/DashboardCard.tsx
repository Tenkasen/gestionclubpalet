import { Link } from "react-router-dom";

interface IProps {
  link: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function DashboardCard({
  link,
  icon,
  title,
  description,
}: IProps) {
  return (
    <Link
      to={link}
      className="bg-surface p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all hover:scale-105"
    >
      <div className="flex items-center gap-4 mb-4">
        {icon}
        <h2 className="text-2xl font-bold text-foreground">
          {title}
        </h2>
      </div>
      <p className="text-foreground-muted italic">{description}</p>
    </Link>
  );
}
