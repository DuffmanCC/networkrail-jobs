import SingleJobSkeleton from "@/app/ui/SingleJobSkeleton";

export default function Loading() {
  return (
    <div
      className="flex justify-center items-start md:items-center pr-2 overflow-y-auto relative z-50"
      style={{ gridColumn: "1/3" }}
    >
      <SingleJobSkeleton />
    </div>
  );
}
