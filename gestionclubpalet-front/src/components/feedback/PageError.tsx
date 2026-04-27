interface IProps {
  errorMessage: string;
}

export default function PageError({ errorMessage }: IProps) {
  return (
    <div className="container flex flex-col pt-20 items-center min-h-screen">
      <div className="flex flex-col items-center gap-4 p-8 bg-white dark:bg-zinc-900 border border-red-200 dark:border-red-900 rounded-2xl max-w-md w-full">
        <div className="w-15 h-15 rounded-full bg-red-50 dark:bg-red-950 flex items-center justify-center shrink-0">
          <svg width="35" height="35" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 6v5M10 14h.01"
              stroke="#ef4444"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle
              cx="10"
              cy="10"
              r="8.5"
              stroke="#ef4444"
              strokeWidth="1.5"
            />
          </svg>
        </div>
        <div className="text-center">
          <p className="font-medium text-lg text-zinc-900 dark:text-zinc-100 mb-1">
            Une erreur est survenue
          </p>
          <p className="text-red-500 dark:text-red-400">
            {errorMessage}
          </p>
        </div>
      </div>
    </div>
  );
}
