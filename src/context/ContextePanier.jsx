import { createContext, useContext, useState, useEffect } from "react";

const ContextePanier = createContext(null);

export function FournisseurPanier({ children }) {
  const [articles, setArticles] = useState(() => {
    const saved = localStorage.getItem("biomim_panier");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("biomim_panier", JSON.stringify(articles));
  }, [articles]);

  const ajouterArticle = (produit) => {
    setArticles((prev) => {
      const existe = prev.find((a) => a.id === produit.id);
      if (existe) return prev.map((a) => a.id === produit.id ? { ...a, quantite: a.quantite + 1 } : a);
      return [...prev, { ...produit, quantite: 1 }];
    });
  };

  const retirerArticle = (id) => setArticles((prev) => prev.filter((a) => a.id !== id));

  const modifierQuantite = (id, quantite) => {
    if (quantite <= 0) return retirerArticle(id);
    setArticles((prev) => prev.map((a) => a.id === id ? { ...a, quantite } : a));
  };

  const viderPanier = () => setArticles([]);

  const total = articles.reduce((acc, a) => acc + a.prix * a.quantite, 0);
  const nombreArticles = articles.reduce((acc, a) => acc + a.quantite, 0);

  return (
    <ContextePanier.Provider value={{ articles, ajouterArticle, retirerArticle, modifierQuantite, viderPanier, total, nombreArticles }}>
      {children}
    </ContextePanier.Provider>
  );
}

export const utiliserContextePanier = () => useContext(ContextePanier);