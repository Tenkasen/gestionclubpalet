import NavLink from "../ui/NavLink.tsx";

export default function HeaderTest() {
  return (
    <header className="border-b py-4 border-indigo-800 sticky top-0 z-90 bg-white">
      <div className="flex justify-center gap-12 text-lg items-center ">
        <NavLink to="/">Accueil</NavLink>
        <NavLink to="/saisons/4/journées/1/saisie-entrainement">
          Saisie Entraînement
        </NavLink>
        <NavLink to="/saisons/5/journées/1/saisie-match">
          Saisie Championnat
        </NavLink>
        <NavLink to="/test">Test</NavLink>
        <NavLink to="/classements/5/journées/1">Classement</NavLink>
      </div>
    </header>
  );
}
