import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { FournisseurAuth } from "./context/ContexteAuth";
import { FournisseurPanier } from "./context/ContextePanier";
import { routeur } from "./routes";

export default function Application() {
  return (
    <FournisseurAuth>
      <FournisseurPanier>
        <RouterProvider router={routeur} />
        <Toaster position="top-right" toastOptions={{ style: { borderRadius: "12px", background: "hsl(0,0%,100%)", color: "hsl(152,30%,10%)", border: "1px solid hsl(152,15%,88%)" } }} />
      </FournisseurPanier>
    </FournisseurAuth>
  );
}