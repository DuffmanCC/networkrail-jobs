export default function SingleJobSkeleton() {
  return (
    <div className="rounded-lg overflow-hidden max-w-4xl w-full animate-pulse">
      <div className="bg-slate-200 dark:bg-slate-800 p-4 flex justify-start">
        <div className="bg-teal-800/20 dark:bg-teal-300/20 rounded-lg h-8 w-96"></div>
      </div>
      <div className="bg-orange-800 dark:bg-orange-300 flex flex-col gap-2 p-4">
        <div className="bg-white/20 dark:bg-black/10 h-6 rounded-lg w-96"></div>
        <div className="bg-white/20 dark:bg-black/10 h-6 rounded-lg w-96"></div>
        <div className="bg-white/20 dark:bg-black/10 h-6 rounded-lg w-96"></div>
        <div className="bg-white/20 dark:bg-black/10 h-6 rounded-lg w-96"></div>
        <div className="bg-white/20 dark:bg-black/10 h-6 rounded-lg w-96"></div>
      </div>
      <div className="bg-slate-200 dark:bg-slate-800 p-4">
        <div className="flex flex-col items-end gap-2 h-48">
          <div className="bg-black/10 dark:bg-black/10 h-6 rounded-lg w-full"></div>
          <div className="bg-black/10 dark:bg-black/10 h-6 rounded-lg w-full"></div>
          <div className="bg-black/10 dark:bg-black/10 h-6 rounded-lg w-full"></div>
          <div className="bg-black/10 dark:bg-black/10 h-6 rounded-lg w-full"></div>
          <div className="bg-black/10 dark:bg-black/10 h-6 rounded-lg w-full"></div>
          <div className="bg-orange-800 dark:bg-orange-300 h-10 inline-block w-32 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}
