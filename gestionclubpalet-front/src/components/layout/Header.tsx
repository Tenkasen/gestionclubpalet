import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="border-b py-4 border-indigo-800 sticky top-0 z-90 bg-white">
      <div className="flex justify-center gap-12 text-lg items-center ">
        <Link
          to="/"
          className="hover:underline
        hover:text-indigo-800 text-gray-700"
        >
          Accueil
        </Link>
        <Link
          to="/entrainement"
          className="hover:underline
        hover:text-indigo-800 text-gray-700"
        >
          Entraînement
        </Link>
        <Link
          to="/championnat"
          className="hover:underline
        hover:text-indigo-800 text-gray-700"
        >
          Championnat
        </Link>
        <Link
          to="/coupe"
          className="hover:underline
        hover:text-indigo-800 text-gray-700"
        >
          Coupe
        </Link>
        <Link
          to="/classements"
          className="hover:underline
        hover:text-indigo-800 text-gray-700"
        >
          Classement
        </Link>
      </div>
    </header>
  );
}
