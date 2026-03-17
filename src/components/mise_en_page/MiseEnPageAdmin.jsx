import { Outlet, Navigate } from "react-router-dom";
import BarreLaterale from "../admin/BarreLaterale";
import BarreSuperieure from "../admin/BarreSuperieure";
import utiliserAuth from "../../hooks/utiliserAuth";

export default function MiseEnPageAdmin() {
  const { utilisateur, chargement } = utiliserAuth();
  if (chargement) return <div className="flex items-center justify-center h-screen"><div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" /></div>;
  if (!utilisateur) return <Navigate to="/admin/connexion" replace />;
  return (
    <div className="flex h-screen bg-secondary overflow-hidden">
      <BarreLaterale />
      <div className="flex-1 flex flex-col ml-64 overflow-hidden">
        <BarreSuperieure />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}