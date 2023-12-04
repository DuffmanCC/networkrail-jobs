import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="flex justify-center items-center text-foreground bg-background"
      style={{
        gridColumn: "1/3",
      }}
    >
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-3xl">404 Not Found</h1>
        <p>Could not find requested resource</p>
        <Link href="/" className="underline">
          Return Home
        </Link>
      </div>
    </div>
  );
}
