export default function JobCardSkeleton() {
  return (
    <div className="bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse">
      <div className="px-3 pb-2 pt-3">
        <div className="bg-slate-100 dark:bg-slate-900 h-12 rounded-lg"></div>
      </div>

      <div className="px-3 py-2">
        <div className="bg-slate-100 dark:bg-slate-900 h-12 rounded-lg"></div>
      </div>

      <div className="px-3 py-2">
        <div className="bg-slate-100 dark:bg-slate-900 h-12 rounded-lg"></div>
      </div>

      <div className="px-3 pb-3 pt-2">
        <div className="bg-slate-100 dark:bg-slate-900 h-12 rounded-lg"></div>
      </div>

      <div className="px-3 pb-3 pt-2">
        <div className="bg-slate-100 dark:bg-slate-900 h-36 rounded-lg"></div>
      </div>
    </div>
  );
}
