export default function JobCardSkeleton() {
  return (
    <div className="bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse">
      <div className="px-3 py-2">
        <div className=" bg-teal-800/10 dark:bg-teal-300/10 h-8 rounded-lg"></div>
      </div>

      <hr className="shrink-0 bg-divider border-none w-full h-divider"></hr>

      <div className="px-3 py-2 h-40">
        <div className="bg-teal-800/10 dark:bg-teal-300/10 h-full rounded-lg"></div>
      </div>

      <hr className="shrink-0 bg-divider border-none w-full h-divider"></hr>

      <div className="px-3 py-2 h-16">
        <div className=" bg-teal-800/10 dark:bg-teal-300/10 h-12 rounded-lg"></div>
      </div>
    </div>
  );
}
