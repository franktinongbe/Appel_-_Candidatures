import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function InscriptionForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // État pour afficher le nom des fichiers sélectionnés
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      window.scrollTo(0, 0);
    }, 2000);
  };

  if (success) {
    return (
      <div className="container py-5 text-center animate__animated animate__zoomIn">
        <div className="card p-5 shadow-lg border-0 rounded-4 bg-white mx-auto" style={{maxWidth: '600px'}}>
          <div className="mb-4">
            <i className="bi bi-check-circle-fill text-success" style={{fontSize: '5rem'}}></i>
          </div>
          <h2 className="fw-black text-dark">Candidature Envoyée !</h2>
          <p className="text-muted fs-5 mb-4">Votre dossier pour la mandature 2025-2030 a été enregistré avec succès.</p>
          <Link to="/" className="btn btn-primary btn-lg px-5 rounded-pill fw-bold shadow">
            RETOUR À L'ACCUEIL
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4 py-md-5">
      {/* Fil d'ariane stylisé */}
      <nav aria-label="breadcrumb" className="mb-4 bg-white p-3 rounded-3 shadow-sm border-start border-primary border-4">
        <ol className="breadcrumb mb-0">
          <li className="breadcrumb-item"><Link to="/" className="text-decoration-none text-muted fw-bold">Accueil</Link></li>
          <li className="breadcrumb-item active text-primary fw-bold">Dossier de Candidature</li>
        </ol>
      </nav>

      <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
        {/* Barre de couleur nationale fine */}
        <div className="d-flex" style={{height: '6px'}}>
          <div className="flex-grow-1 bg-success"></div>
          <div className="flex-grow-1 bg-warning"></div>
          <div className="flex-grow-1 bg-danger"></div>
        </div>

        <div className="card-header bg-white text-center py-5 border-0">
          <img src="/logo.jpeg" alt="Logo AMJB" style={{ width: '100px', height: '100px' }} className="mb-3 rounded-circle shadow-sm border p-1" />
          <h3 className="fw-black text-dark text-uppercase letter-spacing-1">Formulaire d'Inscription</h3>
          <p className="text-muted small">Complétez les informations ci-dessous avec soin</p>
        </div>

        <div className="card-body p-3 p-md-5 pt-0">
          <form onSubmit={handleSubmit} className="needs-validation">
            <div className="row g-4">
              
              {/* --- SECTION 1 --- */}
              <div className="col-12">
                <div className="d-flex align-items-center mb-3">
                  <span className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '32px', height: '32px'}}>1</span>
                  <h5 className="fw-bold text-dark mb-0">ÉTAT CIVIL ET CONTACTS</h5>
                </div>
                <hr className="mt-0 opacity-10"/>
              </div>

              <div className="col-md-12">
                <label className="form-label fw-bold text-secondary small uppercase">Nom Complet *</label>
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0 text-muted"><i className="bi bi-person"></i></span>
                  <input type="text" className="form-control form-control-lg border-start-0 ps-0 fs-6" placeholder="Ex: BABIO Boni" required />
                </div>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold text-secondary small uppercase">Téléphone WhatsApp *</label>
                <input type="tel" className="form-control form-control-lg fs-6" placeholder="+229 XX XX XX XX" required />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold text-secondary small uppercase">Email *</label>
                <input type="email" className="form-control form-control-lg fs-6" placeholder="nom@exemple.com" required />
              </div>

              <div className="col-12">
                <label className="form-label fw-bold text-danger small uppercase">Poste Souhaité *</label>
                <select className="form-select form-select-lg fs-6 border-danger-subtle" required>
                  <option value="">-- Sélectionnez votre poste --</option>
                  {postes.map((group, idx) => (
                    <optgroup key={idx} label={group.cat}>
                      {group.items.map((p, i) => <option key={i} value={p}>{p}</option>)}
                    </optgroup>
                  ))}
                </select>
              </div>

              {/* --- SECTION 2 --- */}
              <div className="col-12 mt-5">
                <div className="d-flex align-items-center mb-3">
                  <span className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '32px', height: '32px'}}>2</span>
                  <h5 className="fw-bold text-dark mb-0">DOCUMENTS JUSTIFICATIFS</h5>
                </div>
                <hr className="mt-0 opacity-10"/>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold text-secondary small">CV + LETTRE DE MOTIVATION (PDF) *</label>
                <div className="file-upload-wrapper">
                  <input type="file" id="cvFile" className="d-none" accept=".pdf" onChange={(e) => handleFileChange(e, 'cv')} required />
                  <label htmlFor="cvFile" className="file-upload-label d-flex flex-column align-items-center justify-content-center p-4 border border-2 border-dashed rounded-3 pointer">
                    <i className="bi bi-file-earmark-pdf text-danger fs-2 mb-2"></i>
                    <span className="small text-center text-muted">{fileNames.cv || "Cliquez pour joindre votre fichier"}</span>
                  </label>
                </div>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold text-secondary small">PIÈCE D'IDENTITÉ (PDF) *</label>
                <div className="file-upload-wrapper">
                  <input type="file" id="idFile" className="d-none" accept=".pdf" onChange={(e) => handleFileChange(e, 'identity')} required />
                  <label htmlFor="idFile" className="file-upload-label d-flex flex-column align-items-center justify-content-center p-4 border border-2 border-dashed rounded-3 pointer">
                    <i className="bi bi-card-heading text-primary fs-2 mb-2"></i>
                    <span className="small text-center text-muted">{fileNames.identity || "Cliquez pour joindre votre pièce"}</span>
                  </label>
                </div>
              </div>

              {/* Validation */}
              <div className="col-12 mt-4">
                <div className="p-3 rounded-3 bg-light border">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="confirm" required />
                    <label className="form-check-label small text-dark fw-medium" htmlFor="confirm">
                      Je certifie être âgé de 18 à 35 ans, résider à Parakou et être de bonne moralité. 
                    </label>
                  </div>
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

        {/* Aide Footer */}
        <div className="bg-dark text-white p-4">
          <div className="row g-3 text-center text-md-start">
            <div className="col-md-8">
              <p className="mb-0 small opacity-75"><i className="bi bi-info-circle me-2 text-warning"></i>Besoin d'aide pour remplir le formulaire ?</p>
              <h6 className="mb-0 fw-bold">Contactez l'assistance : +229 01 66 00 81 00</h6>
            </div>
            <div className="col-md-4 text-md-end">
              <span className="badge bg-primary px-3 py-2">Mandature 2025-2030</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .fw-black { font-weight: 900; }
        .letter-spacing-1 { letter-spacing: 1px; }
        .pointer { cursor: pointer; }
        .file-upload-label { transition: all 0.3s ease; background: #f8f9fa; }
        .file-upload-label:hover { border-color: #0d6efd !important; background: #f0f7ff; }
        .form-control:focus, .form-select:focus { border-color: #0d6efd; box-shadow: 0 0 0 0.25rem rgba(13,110,253,.1); }
        .uppercase { text-transform: uppercase; }
        @media (max-width: 768px) {
          .card-header h3 { font-size: 1.25rem; }
        }
      `}</style>
    </div>
  );
}