import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios'; // Utiliser axios est plus cohérent avec ton formulaire

// ✅ CONFIGURATION UNIQUE
const API_BASE_URL = "https://candidatures-one.vercel.app"; 

export default function AdminDashboard() {
  const [candidats, setCandidats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Utilisation d'Axios pour la cohérence et la gestion des erreurs
    axios.get(`${API_BASE_URL}/api/candidats/liste-privee`)
      .then(res => {
        setCandidats(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erreur de chargement:", err);
        setError("Impossible de charger les données. Vérifiez la connexion au serveur.");
        setLoading(false);
      });
  }, []);

  const exportToExcel = () => {
    const dataToExport = candidats.map(c => ({
      "Date": new Date(c.createdAt).toLocaleDateString('fr-FR'),
      "Nom Complet": c.nom,
      "Poste": c.poste,
      "Téléphone": c.telephone,
      "Email": c.email,
      // On s'assure que le lien vers le fichier est bien construit
      "Lien CV": `${API_BASE_URL}/${c.cvPath}`,
      "Lien ID": `${API_BASE_URL}/${c.idPath}`
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Candidatures");
    XLSX.writeFile(workbook, `Candidatures_MJB_Parakou_2025.xlsx`);
  };

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="spinner-border text-primary" role="status"></div>
    </div>
  );

  return (
    <div className="container-fluid py-5 bg-light min-vh-100">
      <div className="container">
        
        {error && <div className="alert alert-danger shadow-sm border-0">{error}</div>}

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
          <div className="mb-3 mb-md-0">
            <h2 className="fw-bold mb-0 text-dark">Gestion des Candidatures</h2>
            <p className="text-muted small">Mairie des Jeunes | Parakou 🇧🇯</p>
          </div>
          
          <div className="d-flex gap-2">
            <button onClick={exportToExcel} className="btn btn-success shadow-sm d-flex align-items-center fw-bold">
              <i className="bi bi-file-earmark-excel-fill me-2"></i> EXPORTER EXCEL
            </button>
            <div className="bg-dark text-white rounded-3 px-3 d-flex align-items-center shadow-sm">
              <span className="fw-bold">{candidats.length}</span>&nbsp;Postulants
            </div>
          </div>
        </div>

        <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0 bg-white">
              <thead className="table-dark text-uppercase small">
                <tr>
                  <th className="ps-4 py-3">Candidat</th>
                  <th>Poste visé</th>
                  <th>Contact</th>
                  <th>Documents PDF</th>
                  <th>Date d'envoi</th>
                </tr>
              </thead>
              <tbody>
                {candidats.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-5 text-muted">Aucune candidature reçue pour le moment.</td>
                  </tr>
                ) : (
                  candidats.map((c) => (
                    <tr key={c._id}>
                      <td className="ps-4">
                        <div className="fw-bold text-dark">{c.nom}</div>
                        <div className="text-muted small" style={{fontSize: '0.8rem'}}>{c.email}</div>
                      </td>
                      <td>
                        <span className="badge bg-primary bg-opacity-10 text-primary border border-primary-subtle px-3 py-2">
                          {c.poste}
                        </span>
                      </td>
                      <td>
                        <a href={`https://wa.me/${c.telephone.replace(/\s/g, '')}`} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-success rounded-pill px-3">
                          <i className="bi bi-whatsapp me-2"></i>WhatsApp
                        </a>
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          {/* ✅ Correction des liens vers les fichiers */}
                          <a href={`${API_BASE_URL}/${c.cvPath}`} target="_blank" rel="noreferrer" className="btn btn-sm btn-danger px-3 fw-bold">CV</a>
                          <a href={`${API_BASE_URL}/${c.idPath}`} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary px-3 fw-bold">ID</a>
                        </div>
                      </td>
                      <td className="text-muted small">
                        {new Date(c.createdAt).toLocaleDateString('fr-FR')}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}