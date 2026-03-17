import { Outlet } from "react-router-dom";
import BarreNavigation from "../public/BarreNavigation";
import PiedDePage from "../public/PiedDePage";

export default function MiseEnPagePublique() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <BarreNavigation />
      <main className="flex-1">
        <Outlet />
      </main>
      <PiedDePage />
    </div>
  );
}