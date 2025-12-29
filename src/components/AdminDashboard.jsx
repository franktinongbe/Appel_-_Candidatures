import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';

const API_BASE_URL = "https://candidatures-one.vercel.app"; 

export default function AdminDashboard() {
  const [candidats, setCandidats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Appel vers la liste privée
    axios.get(`${API_BASE_URL}/api/candidats/liste-privee`, { withCredentials: true })
      .then(res => {
        setCandidats(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erreur Cloud:", err);
        setError("Accès refusé ou serveur injoignable.");
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
      "Lien CV": `${API_BASE_URL}/${c.cvPath}`,
      "Lien Identité": `${API_BASE_URL}/${c.idPath}`
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Candidatures");
    XLSX.writeFile(workbook, `Candidatures_MJB_Parakou.xlsx`);
  };

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-white">
      <div className="text-center">
        <div className="spinner-grow text-success" role="status"></div>
        <p className="mt-2 fw-bold text-muted">Chargement du Cloud...</p>
      </div>
    </div>
  );

  return (
    <div className="container-fluid py-5 bg-light min-vh-100">
      <div className="container">
        
        {error && <div className="alert alert-danger shadow-sm border-0 border-start border-danger border-4 mb-4">{error}</div>}

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
          <div>
            <h2 className="fw-bold mb-0 text-dark">Dossiers de Candidatures</h2>
            <p className="text-muted small">Administration Mairie des Jeunes de Parakou 🇧🇯</p>
          </div>
          
          <div className="d-flex gap-3 mt-3 mt-md-0">
            <button onClick={exportToExcel} className="btn btn-success shadow-sm d-flex align-items-center fw-bold px-4 rounded-pill">
              <i className="bi bi-download me-2"></i> EXCEL
            </button>
            <div className="bg-dark text-white rounded-pill px-4 d-flex align-items-center shadow-sm">
              <span className="fw-bold fs-5">{candidats.length}</span>&nbsp;Inscrits
            </div>
          </div>
        </div>

        <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-dark text-white">
                <tr>
                  <th className="ps-4 py-3">Candidat</th>
                  <th>Poste</th>
                  <th>Contact</th>
                  <th>Documents</th>
                  <th>Soumission</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {candidats.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-5">Aucune donnée disponible.</td>
                  </tr>
                ) : (
                  candidats.map((c) => (
                    <tr key={c._id}>
                      <td className="ps-4">
                        <div className="fw-bold text-primary">{c.nom}</div>
                        <div className="small text-muted">{c.email}</div>
                      </td>
                      <td>
                        <span className="badge bg-info bg-opacity-10 text-info border px-3 py-2">
                          {c.poste}
                        </span>
                      </td>
                      <td>
                        <a href={`https://wa.me/${c.telephone.replace(/\s/g, '')}`} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-success rounded-pill fw-bold">
                          <i className="bi bi-whatsapp me-1"></i> WhatsApp
                        </a>
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <a href={`${API_BASE_URL}/${c.cvPath}`} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-danger">CV</a>
                          <a href={`${API_BASE_URL}/${c.idPath}`} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-primary">ID</a>
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