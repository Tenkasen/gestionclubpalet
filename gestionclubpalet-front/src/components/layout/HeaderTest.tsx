import { Link } from "react-router-dom";

export default function HeaderTest() {
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
          to="/saisons/4/journées/1/saisie-entrainement"
          className="hover:underline
        hover:text-indigo-800 text-gray-700"
        >
          Saisie Entraînement
        </Link>
        <Link
          to="/saisons/5/journées/1/saisie-match"
          className="hover:underline
        hover:text-indigo-800 text-gray-700"
        >
          Saisie Championnat
        </Link>
        <Link
          to="/test"
          className="hover:underline
        hover:text-indigo-800 text-gray-700"
        >
          Test
        </Link>
        <Link
          to="/classements/5/journées/1"
          className="hover:underline
        hover:text-indigo-800 text-gray-700"
        >
          Classement
        </Link>
      </div>
    </header>
  );
}
