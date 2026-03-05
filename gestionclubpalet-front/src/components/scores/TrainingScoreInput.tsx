import { useState, useRef, useEffect } from "react";

interface IProps {
  player: Player;
  onSave: (score: { pour: number; contre: number }) => void;
  onNext: () => void;
  currentScore?: { pour: number; contre: number };
}

export default function TrainingScoreInput({
  player,
  onSave,
  onNext,
  currentScore,
}: IProps) {
  const [pour, SetPour] = useState(currentScore?.pour || 0);
  const [contre, SetContre] = useState(currentScore?.contre || 0);
  const goalAverage = pour - contre;

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    onSave({ pour, contre });
    onNext();
  };

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow"
    >
      <h3 className="text-xl font-bold mb-4">
        {player.nom} {player.prenom}
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Points POUR
          </label>
          <input
            type="number"
            value={pour}
            min={0}
            max={20}
            onChange={(e) => SetPour(Number(e.target.value))}
            ref={inputRef}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div>
          <label>Points CONTRE</label>
          <input
            type="number"
            value={contre}
            min={0}
            max={20}
            required
            onChange={(e) => SetContre(Number(e.target.value))}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div className="pt-4 border-t">
          <p className="text-lg">
            Goal Average :
            <span
              className={`font-bold ml-2 ${
                goalAverage >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {goalAverage > 0 ? "+" : ""}
              {goalAverage}
            </span>
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          Suivant (Entrer)
        </button>
      </div>
    </form>
  );
}
