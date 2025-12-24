import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InfoPage from './pages/infoPage.jsx';
import InscriptionForm from './components/InscriptionForm';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InfoPage />} />
        <Route path="/postuler" element={<InscriptionForm />} />
      </Routes>
    </Router>
  );
}

export default App;