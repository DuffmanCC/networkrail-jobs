import { Card } from "@nextui-org/react";

export default function Loading() {
  return (
    <>
      <Card
        className="hidden sm:block bg-slate-200 dark:bg-slate-800"
        radius="sm"
        shadow="none"
      >
        <aside className=""></aside>
      </Card>

      <main className="overflow-y-auto">
        <div
          className={
            "grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-2"
          }
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <Card
              key={i}
              className="job-card hover:border-slate-400 dark:hover:border-slate-700 border-2 border-transparent bg-slate-200 dark:bg-slate-800 transition-colors h-60"
              shadow="none"
              radius="sm"
            ></Card>
          ))}
        </div>
      </main>
    </>
  );
}
