import Footer from "../ui/Footer";
import Header from "../ui/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-rows-body grid-cols-body h-screen gap-2 max-w-[1536px] mx-auto p-2 rounded-lg">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
