import { Header } from "@/components/layout/Header";
import { Disclaimer } from "@/components/layout/Disclaimer";

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <div className="no-print">
        <Disclaimer />
      </div>
    </div>
  );
}
