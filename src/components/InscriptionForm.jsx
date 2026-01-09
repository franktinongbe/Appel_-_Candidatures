import { useState, useEffect } from 'react'; // Ajoutez useEffect
import { Link, useNavigate } from 'react-router-dom'; // Ajoutez useNavigate

export default function InscriptionForm() {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  // --- BLOC DE REDIRECTION DISCRÈTE ---
  useEffect(() => {
    // Redirige vers l'accueil immédiatement
    navigate('/', { replace: true });
  }, [navigate]);
  // ------------------------------------

  // Le reste de votre code peut rester tel quel, 
  // il ne sera jamais rendu à l'écran.
  return null; 
}