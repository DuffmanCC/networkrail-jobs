import JobCardSkeleton from "./ui/JobCardSkeleton";
import SidebarSkeleton from "./ui/SidebarSkeleton";

export default function Loading() {
  return (
    <>
      <SidebarSkeleton />

      <main className="overflow-y-auto">
        <div
          className={
            "grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-2"
          }
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <JobCardSkeleton key={i} />
          ))}
        </div>
      </main>
    </>
  );
}
