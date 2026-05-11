import { toPng } from "html-to-image";
import { Download } from "lucide-react";
import { useState } from "react";

interface IProps {
  elementId: string;
  filename: string;
}

export default function RankingExport({
  elementId,
  filename,
}: IProps) {
  const [loading, setLoading] = useState(false);

  const handleExport = () => {
    try {
      setLoading(true);
      const node = document.getElementById(elementId);
      if (!node) {
        return;
      }
      toPng(node, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: "white",
      }).then((dataUrl) => {
        const link = document.createElement("a");
        link.download = filename + ".png";
        link.href = dataUrl;
        link.click();
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleExport}
        disabled={loading}
        className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 bg-green-700 hover:bg-green-700 active:bg-green-800 disabled:bg-green-200 disabled:text-green-400 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-green-500/40 hover:-translate-y-px"
      >
        {loading ? (
          <svg
            className="w-4 h-4 animate-spin text-green-400"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
            />
          </svg>
        ) : (
          <Download className="w-4 h-4" />
        )}
        Télécharger le classement
      </button>
    </div>
  );
}
