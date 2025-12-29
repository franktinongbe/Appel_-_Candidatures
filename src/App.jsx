import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InfoPage from './pages/infoPage.jsx';
import InscriptionForm from './components/InscriptionForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Page d'accueil : Présentation des postes et critères */}
        <Route path="/" element={<InfoPage />} />
        
        {/* Page du formulaire : Prépare le message WhatsApp */}
        <Route path="/postuler" element={<InscriptionForm />} />

        {/* Note : La route Admin est retirée car avec la méthode WhatsApp Direct, 
            les données ne sont plus stockées sur un serveur mais reçues sur ton téléphone.
        */}
        
        {/* Redirection automatique pour éviter les erreurs 404 */}
        <Route path="*" element={<InfoPage />} />
      </Routes>
    </Router>
  );
}

export default App;