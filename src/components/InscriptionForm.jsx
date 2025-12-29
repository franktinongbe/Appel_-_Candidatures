import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// ✅ CONFIGURATION : URL de base de ton backend
const API_BASE_URL = "https://candidatures-one.vercel.app";

export default function InscriptionForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null); 
  const [fileNames, setFileNames] = useState({ cv: '', identity: '' });

  const postes = [
    { cat: "Bureau Exécutif", items: ["Directeur de Cabinet", "Chargé(e) de la Communication", "Secrétaire Général(e)", "Secrétaire Général(e) Adjoint(e)", "Trésorier(ère) Général(e)", "Trésorier(ère) Adjoint(e)", "Chef(fe) de Projet"] },
    { cat: "Chefs de Services", items: ["Environnement & Assainissement", "Sports & Loisirs", "Entrepreneuriat & Emploi des Jeunes", "Informatique & Numérique", "Agriculture", "Santé & Éducation Sexuelle", "Genre & Affaires Sociales", "Culture, Patrimoine & Tourisme", "Éducation & Relations Institutionnelles"] }
  ];

  const handleFileChange = (e, key) => {
    if (e.target.files[0]) {
      setFileNames({ ...fileNames, [key]: e.target.files[0].name });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('nom', e.target.nom.value);
    formData.append('telephone', e.target.telephone.value);
    formData.append('email', e.target.email.value);
    formData.append('poste', e.target.poste.value);
    formData.append('cv', e.target.cvFile.files[0]);
    formData.append('identite', e.target.idFile.files[0]);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/candidats/postuler`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.status === 200 || response.status === 201) {
        setSuccess(true);
        window.scrollTo(0, 0);
        const msg = `*NOUVELLE CANDIDATURE*%0A*Nom:* ${e.target.nom.value}%0A*Poste:* ${e.target.poste.value}`;
        setTimeout(() => window.open(`https://wa.me/22940341969?text=${msg}`, '_blank'), 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Erreur de connexion au serveur.");
    } finally {
      setLoading(false);
    }
  };

  if (success) return (
    <div className="container py-5 text-center animate__animated animate__zoomIn">
      <div className="card p-5 shadow-lg border-0 rounded-4 bg-white mx-auto" style={{maxWidth: '600px'}}>
        <div className="mb-4"><i className="bi bi-check-circle-fill text-success" style={{fontSize: '5rem'}}></i></div>
        <h2 className="fw-bold text-dark">Candidature Envoyée !</h2>
        <p className="text-muted fs-5 mb-4">Votre dossier a été enregistré. WhatsApp va s'ouvrir pour notifier la Mairie.</p>
        <Link to="/" className="btn btn-primary btn-lg px-5 rounded-pill fw-bold shadow">RETOUR À L'ACCUEIL</Link>
      </div>
    </div>
  );

  return (
    <div className="container py-4 py-md-5">
      {/* Navigation / Fil d'ariane */}
      <nav aria-label="breadcrumb" className="mb-4 bg-white p-3 rounded-3 shadow-sm border-start border-primary border-4">
        <ol className="breadcrumb mb-0">
          <li className="breadcrumb-item"><Link to="/" className="text-decoration-none text-muted fw-bold">Accueil</Link></li>
          <li className="breadcrumb-item active text-primary fw-bold">Dossier de Candidature</li>
        </ol>
      </nav>

      <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
        {/* Barre Tricolore */}
        <div className="d-flex" style={{height: '6px'}}>
          <div className="flex-grow-1 bg-success"></div>
          <div className="flex-grow-1 bg-warning"></div>
          <div className="flex-grow-1 bg-danger"></div>
        </div>

        {/* Header du Formulaire */}
        <div className="card-header bg-white text-center py-5 border-0">
          <img src="/logo.jpeg" alt="Logo" style={{ width: '100px', height: '100px' }} className="mb-3 rounded-circle shadow-sm border p-1" />
          <h3 className="fw-bold text-dark text-uppercase letter-spacing-1">Formulaire d'Inscription</h3>
          <p className="text-muted small">Les documents doivent être au format PDF (Max 5Mo)</p>
        </div>

        {/* Corps du Formulaire */}
        <div className="card-body p-3 p-md-5 pt-0">
          {error && <div className="alert alert-danger shadow-sm border-0 border-start border-danger border-4 mb-4">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="row g-4">
              <div className="col-md-12">
                <label className="form-label fw-bold text-secondary small uppercase">Nom Complet *</label>
                <input type="text" name="nom" className="form-control form-control-lg bg-light" placeholder="Ex: Jean BONI" required />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold text-secondary small uppercase">Téléphone WhatsApp *</label>
                <input type="tel" name="telephone" className="form-control form-control-lg bg-light" placeholder="+229 00 00 00 00" required />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold text-secondary small uppercase">Email *</label>
                <input type="email" name="email" className="form-control form-control-lg bg-light" placeholder="email@exemple.com" required />
              </div>

              <div className="col-12">
                <label className="form-label fw-bold text-danger small uppercase">Poste Souhaité *</label>
                <select name="poste" className="form-select form-select-lg border-danger-subtle" required>
                  <option value="">-- Sélectionnez votre poste --</option>
                  {postes.map((group, idx) => (
                    <optgroup key={idx} label={group.cat}>
                      {group.items.map((p, i) => <option key={i} value={p}>{p}</option>)}
                    </optgroup>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold text-secondary small uppercase">CV + Lettre (PDF) *</label>
                <input type="file" id="cvFile" className="d-none" accept=".pdf" onChange={(e) => handleFileChange(e, 'cv')} required />
                <label htmlFor="cvFile" className="file-upload-label d-flex flex-column align-items-center justify-content-center p-4 border border-2 border-dashed rounded-3 bg-light pointer">
                  <i className="bi bi-file-earmark-pdf text-danger fs-2"></i>
                  <span className="small text-muted text-center mt-2">{fileNames.cv || "Cliquer pour joindre"}</span>
                </label>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold text-secondary small uppercase">Pièce d'Identité (PDF) *</label>
                <input type="file" id="idFile" className="d-none" accept=".pdf" onChange={(e) => handleFileChange(e, 'identity')} required />
                <label htmlFor="idFile" className="file-upload-label d-flex flex-column align-items-center justify-content-center p-4 border border-2 border-dashed rounded-3 bg-light pointer">
                  <i className="bi bi-card-heading text-primary fs-2"></i>
                  <span className="small text-muted text-center mt-2">{fileNames.identity || "Cliquer pour joindre"}</span>
                </label>
              </div>

              <div className="col-12 text-center mt-5">
                <button type="submit" className="btn btn-success btn-lg px-md-5 py-3 rounded-pill fw-bold shadow-lg w-100 w-md-auto" disabled={loading}>
                  {loading ? (
                    <><span className="spinner-border spinner-border-sm me-2"></span> ENVOI EN COURS...</>
                  ) : (
                    <>SOUMETTRE MON DOSSIER <i className="bi bi-send-fill ms-2"></i></>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Pied de page technique */}
        <div className="bg-dark text-white p-4 text-center">
          <small className="opacity-75">Assistance technique : +229 01 40 34 19 69</small>
        </div>
      </div>

      <style>{`
        .letter-spacing-1 { letter-spacing: 1px; }
        .pointer { cursor: pointer; }
        .file-upload-label { transition: all 0.3s ease; min-height: 120px; }
        .file-upload-label:hover { border-color: #198754 !important; background: #f0fff4 !important; }
        .uppercase { text-transform: uppercase; }
        .form-control:focus, .form-select:focus { border-color: #198754; box-shadow: 0 0 0 0.25rem rgba(25, 135, 84, 0.1); }
      `}</style>
    </div>
  );
}