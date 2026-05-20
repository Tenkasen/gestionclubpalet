import NavLink from "../ui/NavLink.tsx";

export default function Header() {
  return (
    <header className="border-b py-4 border-indigo-800 sticky top-0 z-90 bg-surface">
      <div className="flex justify-center gap-12 text-lg items-center ">
        <NavLink to="/">Accueil</NavLink>
        <NavLink to="/entrainement">Entraînement</NavLink>
        <NavLink to="/championnat">Championnat</NavLink>
        <NavLink to="/coupe">Coupe</NavLink>
        <NavLink to="/classement">Classement</NavLink>
      </div>
    </header>
  );
}
