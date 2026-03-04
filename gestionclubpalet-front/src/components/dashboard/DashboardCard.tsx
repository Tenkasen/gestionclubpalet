import { type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface IProps {
  link: string;
  icon: LucideIcon;
  iconColor: string;
  title: string;
  description: string;
}

export default function DashboardCard({
  link,
  icon: Icon,
  iconColor,
  title,
  description,
}: IProps) {
  return (
    <Link
      to={link}
      className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all hover:scale-105"
    >
      <div className="flex items-center gap-4 mb-4">
        <Icon className={iconColor} size={48} />
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      </div>
      <p className="text-gray-600 italic">{description}</p>
    </Link>
  );
}
