import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import InfoPage from './pages/infoPage.jsx';
import InscriptionForm from './components/InscriptionForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Page d'accueil */}
        <Route path="/" element={<InfoPage />} />
        
        {/* Page du formulaire */}
        <Route path="/postuler" element={<InscriptionForm />} />

        {/* Si l'utilisateur tape une adresse inexistante, il revient à l'accueil */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
