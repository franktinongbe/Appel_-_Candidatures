import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InfoPage from './pages/infoPage.jsx';
import InscriptionForm from './components/InscriptionForm';
import AdminDashboard from './components/AdminDashboard'; // 1. Import de l'admin
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Pour les icônes WhatsApp/Excel

function App() {
  return (
    <Router>
      <Routes>
        {/* Page d'accueil avec les informations */}
        <Route path="/" element={<InfoPage />} />
        
        {/* Formulaire de candidature pour les jeunes */}
        <Route path="/postuler" element={<InscriptionForm />} />

        {/* 2. Route Admin sécurisée (ne pas partager publiquement) */}
        <Route path="/admin-prive-mjb-2025" element={<AdminDashboard />} />
        
        {/* Optionnel : Redirection si la page n'existe pas */}
        <Route path="*" element={<InfoPage />} />
      </Routes>
    </Router>
  );
}

export default App;