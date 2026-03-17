import { useState, useCallback } from "react";

export default function utiliserRequete(fonctionAsync) {
  const [donnees, setDonnees] = useState(null);
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState(null);

  const executer = useCallback(async (...args) => {
    setChargement(true);
    setErreur(null);
    try {
      const res = await fonctionAsync(...args);
      setDonnees(res);
      return res;
    } catch (e) {
      setErreur(e.message || "Erreur inconnue");
    } finally {
      setChargement(false);
    }
  }, [fonctionAsync]);

  return { donnees, chargement, erreur, executer };
}