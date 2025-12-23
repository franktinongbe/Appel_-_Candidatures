import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function InscriptionForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const postes = [
    "Directeur de Cabinet", "Chargé(e) de la Communication", "Secrétaire Général(e)",
    "Secrétaire Général(e) Adjoint(e)", "Trésorier(ère) Général(e)", "Trésorier(ère) Adjoint(e)",
    "Chef(fe) de Projet", "Chef Service : Environnement & Assainissement",
    "Chef Service : Sports & Loisirs", "Chef Service : Entrepreneuriat & Emploi des Jeunes",
    "Chef Service : Intercommunalité & Renforcement des Capacités",
    "Chef Service : Informatique & Numérique", "Chef Service : Communication",
    "Chef Service : Agriculture", "Chef Service : Santé & Éducation Sexuelle",
    "Chef Service : Genre & Affaires Sociales", "Chef Service : Culture, Patrimoine & Tourisme",
    "Chef Service : Éducation & Relations Institutionnelles"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 2000);
  };

  if (success) {
    return (
      <div className="container mt-5 text-center animate__animated animate__fadeIn">
        <div className="card p-5 shadow-lg border-0 rounded-4 bg-white">
          <div className="display-1 text-success mb-3">✅</div>
          <h2 className="fw-bold text-dark">Candidature Envoyée !</h2>
          <p className="text-muted fs-5">Merci pour votre intérêt. Votre dossier est désormais en cours d'étude par la Mairie des Jeunes.</p>
          <Link to="/" className="btn btn-primary px-5 py-3 mt-3 rounded-pill fw-bold shadow-sm">
            RETOUR À L'ACCUEIL
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5 animate__animated animate__fadeIn">
      {/* Fil d'ariane */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/" className="text-decoration-none fw-bold">Accueil</Link></li>
          <li className="breadcrumb-item active fw-medium">Formulaire d'inscription</li>
        </ol>
      </nav>

      <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
        {/* En-tête avec rappel des couleurs nationales */}
        <div className="d-flex" style={{height: '8px'}}>
          <div className="w-25 bg-success"></div>
          <div className="w-50 bg-warning"></div>
          <div className="w-25 bg-danger"></div>
        </div>

        <div className="card-header bg-white text-center py-4 border-0">
          <img src="/logo.jpeg" alt="Logo AMJB" style={{ height: '100px', width: '100px', objectFit: 'contain' }} className="mb-3 rounded-circle shadow-sm p-1 bg-white" />
          <h4 className="fw-bold text-dark mb-0">DOSSIER DE CANDIDATURE</h4>
          <p className="small text-muted mb-0 italic">Tous les champs marqués d'une étoile (*) sont obligatoires</p>
        </div>

        <div className="card-body p-4 p-lg-5 bg-white">
          <form onSubmit={handleSubmit}>
            <div className="row g-4">
              
              <div className="col-12">
                <h6 className="text-primary fw-bold text-uppercase border-bottom pb-2 mb-3">
                  <i className="bi bi-person-circle me-2"></i> 1. État Civil & Contact
                </h6>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold small">NOM ET PRÉNOMS *</label>
                <input type="text" className="form-control form-control-lg bg-light border-0" placeholder="Ex: BIO Boni" required />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold small">TÉLÉPHONE (WHATSAPP) *</label>
                <input type="tel" className="form-control form-control-lg bg-light border-0" placeholder="+229 XX XX XX XX" required />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold small">EMAIL PROFESSIONNEL *</label>
                <input type="email" className="form-control form-control-lg bg-light border-0" placeholder="votre@mail.com" required />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold small text-danger">POSTE SOLLICITÉ *</label>
                <select className="form-select form-select-lg bg-light border-0" required>
                  <option value="">-- Choisissez dans la liste --</option>
                  {postes.map((p, index) => (
                    <option key={index} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              <div className="col-12 mt-5">
                <h6 className="text-primary fw-bold text-uppercase border-bottom pb-2 mb-3">
                  <i className="bi bi-file-earmark-pdf me-2"></i> 2. Pièces Jointes (Format PDF)
                </h6>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold small">CV + LETTRE DE MOTIVATION *</label>
                <div className="input-group">
                  <span className="input-group-text bg-white border-0"><i className="bi bi-file-pdf text-danger"></i></span>
                  <input type="file" className="form-control border-0 bg-light" accept=".pdf" required />
                </div>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold small">PIÈCE D'IDENTITÉ (CIP/CNI) *</label>
                <div className="input-group">
                  <span className="input-group-text bg-white border-0"><i className="bi bi-card-heading text-primary"></i></span>
                  <input type="file" className="form-control border-0 bg-light" accept=".pdf" required />
                </div>
              </div>

              <div className="col-12 mt-5 text-center">
                <div className="form-check d-inline-block text-start mb-4 p-3 bg-light rounded-3 border">
                  <input className="form-check-input ms-0 me-2" type="checkbox" id="certify" required />
                  <label className="form-check-label small fw-medium" htmlFor="certify">
                    Je certifie sur l'honneur être âgé de 18 à 35 ans et être de bonne moralité.
                  </label>
                </div>
                
                <div className="d-grid gap-2 col-lg-8 mx-auto">
                  <button type="submit" className="btn btn-success btn-lg fw-bold py-3 shadow rounded-pill" disabled={loading}>
                    {loading ? (
                      <><span className="spinner-border spinner-border-sm me-2"></span> TRAITEMENT...</>
                    ) : 'VALIDER MA CANDIDATURE'}
                  </button>
                </div>
              </div>

            </div>
          </form>
        </div>

        {/* Footer Contacts */}
        <div className="card-footer bg-dark text-white p-4 border-0">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
              <h6 className="fw-bold mb-1"><i className="bi bi-headset me-2 text-warning"></i>Assistance Technique</h6>
              <p className="small mb-0 opacity-75">Disponible de 08h à 18h pour vous accompagner.</p>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <div className="d-flex flex-wrap justify-content-center justify-content-md-end gap-2">
                <span className="badge bg-secondary py-2 px-3 fw-normal">+229 66 00 81 00 </span>
                <span className="badge bg-secondary py-2 px-3 fw-normal">+229 YY YY YY YY</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}