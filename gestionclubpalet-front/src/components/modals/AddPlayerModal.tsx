interface IProps {
  handleCLick: () => void;
  handleFunction: (e: React.SubmitEvent<HTMLFormElement>) => void;
}
export default function AddPlayerModal({
  handleCLick,
  handleFunction,
}: IProps) {
  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
        <div className="bg-stone-100 rounded-xl shadow-2xl border border-slate-200 w-full max-w-xl mx-8 p-6">
          <div className="flex justify-between items-center mb-6 px-2">
            <h2 className="text-2xl font-semibold text-indigo-800">
              Ajouter un licencié
            </h2>
            <button
              type="button"
              onClick={handleCLick}
              className="cursor-pointer rounded hover:bg-red-500 transition-colors px-0.5"
            >
              <i className="fa-solid fa-xmark text-stone-700 text-sm"></i>
            </button>
          </div>
          <form onSubmit={handleFunction}>
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <label className="block text-stone-700 mb-1">
                  Nom
                </label>
                <input
                  type="text"
                  name="nom"
                  placeholder="Votre Nom"
                  className="border border-stone-400 rounded px-3 py-2 w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-stone-700 mb-1">
                  Prénom
                </label>
                <input
                  type="text"
                  name="prenom"
                  placeholder="Votre Prénom"
                  className="border border-stone-400 rounded px-3 py-2 w-full"
                  required
                />
              </div>
            </div>
            <div className="mb-8">
              <label className="block text-stone-700 mb-1">
                Adresse mail
              </label>
              <input
                type="email"
                placeholder="mon-mail@email.com"
                className="border border-stone-400 rounded px-3 py-2 w-full"
              />
            </div>
            <div className="grid grid-cols-2 gap-8 mb-10">
              <div>
                <label className="block text-stone-700 mb-1">
                  Date de naissance
                </label>
                <input
                  type="date"
                  className="border border-stone-400 rounded px-3 py-2 w-full"
                />
              </div>
              <div>
                <label className="block text-stone-700 mb-1">
                  Numéro de téléphone
                </label>
                <input
                  type="tel"
                  placeholder="06 07 08 09 10"
                  className="border border-stone-400 rounded px-3 py-2 w-full"
                />
              </div>
            </div>
            <div className="flex justify-center gap-10 mb-6">
              <button
                type="submit"
                className="border border-white bg-blue-600 p-2 rounded-lg text-stone-100 hover:cursor-pointer hover:bg-blue-500"
              >
                Sauvegarder
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded text-stone-600 border border-stone-400 hover:bg-stone-200 hover:cursor-pointer"
                onClick={handleCLick}
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
