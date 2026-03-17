import { createBrowserRouter } from "react-router-dom";
import MiseEnPagePublique from "./components/mise_en_page/MiseEnPagePublique";
import MiseEnPageAdmin from "./components/mise_en_page/MiseEnPageAdmin";

// Pages publiques
import Accueil from "./page/public/Accueil";
import APropos from "./page/public/APropos";
import CataloguePlantes from "./page/public/plantes/CataloguePlantes";
import DetailPlante from "./page/public/plantes/DetailPlante";
import CatalogueProduits from "./page/public/produits/CatalogueProduits";
import DetailProduit from "./page/public/produits/DetailProduit";
import Boutique from "./page/public/marketplace/Boutique";
import Panier from "./page/public/marketplace/Panier";
import Paiement from "./page/public/marketplace/Paiement";
import Blog from "./page/public/Blog";
import Article from "./page/public/Article";
import Partenaires from "./page/public/Partenaires";
import Contact from "./page/public/Contact";
import ChatBotPage from "./page/public/assistant/ChatBotPage";
import MapPage from "./page/public/map/MapPage";
// Pages admin
import Connexion from "./page/admin/Connexion";
import TableauDeBord from "./page/admin/TableauDeBord";
import GestionPlantes from "./page/admin/GestionPlantes";
import GestionProduits from "./page/admin/GestionProduits";
import GestionCommandes from "./page/admin/GestionCommandes";
import GestionArticles from "./page/admin/GestionArticles";
import GestionPartenaires from "./page/admin/GestionPartenaires";
import GestionUtilisateurs from "./page/admin/GestionUtilisateurs";
import GestionMessages from "./page/admin/GestionMessages";

export const routeur = createBrowserRouter([
  {
    path: "/",
    element: <MiseEnPagePublique />,
    children: [
      { index: true, element: <Accueil /> },
      { path: "a-propos", element: <APropos /> },
      { path: "plantes", element: <CataloguePlantes /> },
      { path: "plantes/:id", element: <DetailPlante /> },
      { path: "produits", element: <CatalogueProduits /> },
      { path: "produits/:id", element: <DetailProduit /> },
      { path: "boutique", element: <Boutique /> },
      { path: "panier", element: <Panier /> },
      { path: "paiement", element: <Paiement /> },
      { path: "blog", element: <Blog /> },
      { path: "blog/:slug", element: <Article /> },
      { path: "partenaires", element: <Partenaires /> },
      { path: "contact", element: <Contact /> },
      { path: "chat", element: <ChatBotPage /> },
      { path: "map", element: <MapPage /> },
    ],
  },
  { path: "/admin/connexion", element: <Connexion /> },
  {
    path: "/admin",
    element: <MiseEnPageAdmin />,
    children: [
      { index: true, element: <TableauDeBord /> },
      { path: "plantes", element: <GestionPlantes /> },
      { path: "produits", element: <GestionProduits /> },
      { path: "commandes", element: <GestionCommandes /> },
      { path: "articles", element: <GestionArticles /> },
      { path: "partenaires", element: <GestionPartenaires /> },
      { path: "utilisateurs", element: <GestionUtilisateurs /> },
      { path: "messages", element: <GestionMessages /> },
    ],
  },
]);