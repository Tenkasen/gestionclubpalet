import { RotatingLines } from "react-loader-spinner";

export default function PageLoading() {
  return (
    <div className="container flex flex-col justify-center items-center min-h-screen">
      <p className="text-lg pb-10 font-medium tracking-widest uppercase text-zinc-400 dark:text-zinc-500">
        Chargement en cours...
      </p>
      <RotatingLines
        visible={true}
        height="96"
        width="96"
        color="grey"
        strokeWidth="5"
        animationDuration="1.25"
        ariaLabel="rotating-lines-loading"
      />
    </div>
  );
}
