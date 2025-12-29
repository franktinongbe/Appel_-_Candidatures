import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// ✅ CONFIGURATION : Pas de slash à la fin de l'URL de base
const API_BASE_URL = "https://candidatures-one.vercel.app";

export default function InscriptionForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null); 
  const [fileNames, setFileNames] = useState({ cv: '', identity: '' });

  const postes = [
    { cat: "Bureau Exécutif", items: ["Directeur de Cabinet", "Chargé(e) de la Communication", "Secrétaire Général(e)", "Secrétaire Général(e) Adjoint(e)", "Trésorier(ère) Général(e)", "Trésorier(ère) Adjoint(e)", "Chef(fe) de Projet"] },
    { cat: "Chefs de Services", items: ["Environnement & Assainissement", "Sports & Loisirs", "Entrepreneuriat & Emploi des Jeunes", "Intercommunalité & Renforcement des Capacités", "Informatique & Numérique", "Communication", "Agriculture", "Santé & Éducation Sexuelle", "Genre & Affaires Sociales", "Culture, Patrimoine & Tourisme", "Éducation & Relations Institutionnelles"] }
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

    const nom = e.target.nom.value;
    const telephone = e.target.telephone.value;
    const poste = e.target.poste.value;

    // 1. Préparation du FormData (Indispensable pour envoyer des fichiers PDF)
    const formData = new FormData();
    formData.append('nom', nom);
    formData.append('telephone', telephone);
    formData.append('email', e.target.email.value);
    formData.append('poste', poste);
    formData.append('cv', e.target.cvFile.files[0]);
    formData.append('identite', e.target.idFile.files[0]);

    try {
      // 2. Envoi avec Axios vers l'endpoint propre
      // Le chemin devient : https://candidatures-one.vercel.app/api/candidats/postuler
      const response = await axios.post(`${API_BASE_URL}/api/candidats/postuler`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });

      if (response.status === 200 || response.status === 201) {
        // --- LOGIQUE WHATSAPP ---
        const monNumero = "22940341969"; 
        const messageWhatsApp = `*NOUVELLE CANDIDATURE - MJB*%0A%0A*Nom:* ${nom}%0A*Poste:* ${poste}%0A*Tél:* ${telephone}%0A%0A_Mon dossier a été soumis avec succès sur la plateforme._`;
        const whatsappUrl = `https://wa.me/${monNumero}?text=${messageWhatsApp}`;

        setSuccess(true);
        window.scrollTo(0, 0);

        setTimeout(() => {
          window.open(whatsappUrl, '_blank');
        }, 2000);
      }
    } catch (err) {
      console.error("Erreur détaillée:", err);
      // Récupération du message d'erreur du backend s'il existe
      const errorMessage = err.response?.data?.message || "Erreur de connexion au serveur. Vérifiez votre connexion ou le format des fichiers.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="container py-5 text-center animate__animated animate__zoomIn">
        <div className="card p-5 shadow-lg border-0 rounded-4 bg-white mx-auto" style={{maxWidth: '600px'}}>
          <div className="mb-4">
            <i className="bi bi-check-circle-fill text-success" style={{fontSize: '5rem'}}></i>
          </div>
          <h2 className="fw-black text-dark">Candidature Envoyée !</h2>
          <p className="text-muted fs-5 mb-4">Votre dossier a été enregistré. WhatsApp va s'ouvrir pour notifier la Mairie.</p>
          <Link to="/" className="btn btn-primary btn-lg px-5 rounded-pill fw-bold shadow">
            RETOUR À L'ACCUEIL
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4 py-md-5">
      <nav aria-label="breadcrumb" className="mb-4 bg-white p-3 rounded-3 shadow-sm border-start border-primary border-4">
        <ol className="breadcrumb mb-0">
          <li className="breadcrumb-item"><Link to="/" className="text-decoration-none text-muted fw-bold">Accueil</Link></li>
          <li className="breadcrumb-item active text-primary fw-bold">Dossier de Candidature</li>
        </ol>
      </nav>

      <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
        <div className="d-flex" style={{height: '6px'}}>
          <div className="flex-grow-1 bg-success"></div>
          <div className="flex-grow-1 bg-warning"></div>
          <div className="flex-grow-1 bg-danger"></div>
        </div>

        <div className="card-header bg-white text-center py-5 border-0">
          <img src="/logo.jpeg" alt="Logo AMJB" style={{ width: '100px', height: '100px' }} className="mb-3 rounded-circle shadow-sm border p-1" />
          <h3 className="fw-black text-dark text-uppercase letter-spacing-1">Formulaire d'Inscription</h3>
          <p className="text-muted small">Les documents doivent être au format PDF</p>
        </div>

        <div className="card-body p-3 p-md-5 pt-0">
          {error && (
            <div className="alert alert-danger d-flex align-items-center mb-4 shadow-sm border-0 border-start border-danger border-4">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              <div>{error}</div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="row g-4">
              <div className="col-12 text-center mb-2">
                <span className="badge bg-light text-dark border px-3 py-2 rounded-pill">Informations Personnelles</span>
              </div>

              <div className="col-md-12">
                <label className="form-label fw-bold text-secondary small uppercase">Nom Complet *</label>
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0 text-muted"><i className="bi bi-person"></i></span>
                  <input type="text" name="nom" className="form-control form-control-lg border-start-0 ps-0 fs-6" placeholder="Ex: BABIO Boni" required />
                </div>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold text-secondary small uppercase">Téléphone WhatsApp *</label>
                <input type="tel" name="telephone" className="form-control form-control-lg fs-6" placeholder="+229 XX XX XX XX" required />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold text-secondary small uppercase">Email *</label>
                <input type="email" name="email" className="form-control form-control-lg fs-6" placeholder="nom@exemple.com" required />
              </div>

              <div className="col-12">
                <label className="form-label fw-bold text-danger small uppercase">Poste Souhaité *</label>
                <select name="poste" className="form-select form-select-lg fs-6 border-danger-subtle" required>
                  <option value="">-- Sélectionnez votre poste --</option>
                  {postes.map((group, idx) => (
                    <optgroup key={idx} label={group.cat}>
                      {group.items.map((p, i) => <option key={i} value={p}>{p}</option>)}
                    </optgroup>
                  ))}
                </select>
              </div>

              <div className="col-12 mt-5 text-center">
                <span className="badge bg-light text-dark border px-3 py-2 rounded-pill">Documents (PDF)</span>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold text-secondary small">CV + LETTRE DE MOTIVATION *</label>
                <div className="file-upload-wrapper">
                  <input type="file" id="cvFile" name="cvFile" className="d-none" accept=".pdf" onChange={(e) => handleFileChange(e, 'cv')} required />
                  <label htmlFor="cvFile" className="file-upload-label d-flex flex-column align-items-center justify-content-center p-4 border border-2 border-dashed rounded-3 pointer">
                    <i className="bi bi-file-earmark-pdf text-danger fs-2 mb-2"></i>
                    <span className="small text-center text-muted">{fileNames.cv || "Cliquez pour joindre"}</span>
                  </label>
                </div>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold text-secondary small">PIÈCE D'IDENTITÉ *</label>
                <div className="file-upload-wrapper">
                  <input type="file" id="idFile" name="idFile" className="d-none" accept=".pdf" onChange={(e) => handleFileChange(e, 'identity')} required />
                  <label htmlFor="idFile" className="file-upload-label d-flex flex-column align-items-center justify-content-center p-4 border border-2 border-dashed rounded-3 pointer">
                    <i className="bi bi-card-heading text-primary fs-2 mb-2"></i>
                    <span className="small text-center text-muted">{fileNames.identity || "Cliquez pour joindre"}</span>
                  </label>
                </div>
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

        <div className="bg-dark text-white p-4 text-center">
          <small className="opacity-75">Assistance technique : +229 01 40 34 19 69</small>
        </div>
      </div>

      <style>{`
        .fw-black { font-weight: 900; }
        .letter-spacing-1 { letter-spacing: 1px; }
        .pointer { cursor: pointer; }
        .file-upload-label { transition: all 0.3s ease; background: #f8f9fa; min-height: 120px; }
        .file-upload-label:hover { border-color: #0d6efd !important; background: #f0f7ff; }
        .form-control:focus, .form-select:focus { border-color: #0d6efd; box-shadow: 0 0 0 0.25rem rgba(13,110,253,.1); }
        .uppercase { text-transform: uppercase; }
      `}</style>
    </div>
  );
}