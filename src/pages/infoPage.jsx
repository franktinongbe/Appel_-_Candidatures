import { Link } from 'react-router-dom';

export default function InfoPage() {
  const bureaux = [
    "Directeur de Cabinet", "Chargé(e) de la Communication",
    "Secrétaire Général(e) / Adjoint(e)", "Trésorier(ère) Général(e) / Adjoint(e)",
    "Chef(fe) de Projet"
  ];

  const services = [
    "Environnement & Assainissement", "Sports & Loisirs",
    "Entrepreneuriat & Emploi des Jeunes", "Intercommunalité & Renforcement des Capacités",
    "Informatique & Numérique", "Communication", "Agriculture",
    "Santé & Éducation Sexuelle", "Genre & Affaires Sociales",
    "Culture, Patrimoine & Tourisme", "Éducation & Relations Institutionnelles"
  ];

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">
        {/* Header Institutionnel */}
        <div className="text-center mb-5 animate__animated animate__fadeIn">
          <div className="mb-4 d-inline-block p-2 bg-white rounded-circle shadow-sm">
             <img src="/logo.jpeg" alt="Logo AMJB" style={{ height: '180px', width: '180px', objectFit: 'contain' }} className="rounded-circle" />
          </div>
          <h1 className="display-5 fw-black text-dark mb-2" style={{ letterSpacing: '-1px' }}>APPEL À CANDIDATURE</h1>
          <h3 className="text-success fw-bold text-uppercase">Mairie des Jeunes de Parakou</h3>
          <div className="badge bg-warning text-dark fs-6 px-4 py-2 rounded-pill shadow-sm mt-2">
            Mandature 2025 - 2030
          </div>
        </div>

        <div className="row g-4">
          {/* Postes */}
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm rounded-4 h-100 overflow-hidden">
              <div className="card-header bg-dark text-white py-3 px-4">
                <h5 className="mb-0 fw-bold"><i className="bi bi-briefcase me-2"></i> Postes à Pourvoir</h5>
              </div>
              <div className="card-body p-4 bg-white">
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <div className="d-flex align-items-center mb-3">
                        <div className="bg-primary p-1 rounded me-2"></div>
                        <h6 className="text-primary fw-bold mb-0">Bureau Exécutif</h6>
                    </div>
                    <ul className="list-unstyled">
                      {bureaux.map((p, i) => (
                        <li key={i} className="py-2 border-bottom border-light small text-secondary">
                          <span className="text-success me-2">●</span> {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex align-items-center mb-3">
                        <div className="bg-success p-1 rounded me-2"></div>
                        <h6 className="text-success fw-bold mb-0">Chefs de Services</h6>
                    </div>
                    <div className="pe-2" style={{ maxHeight: '350px', overflowY: 'auto' }}>
                      {services.map((s, i) => (
                        <li key={i} className="list-unstyled py-2 border-bottom border-light small text-secondary">
                          <span className="text-warning me-2">→</span> {s}
                        </li>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar : Conditions & Action */}
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 mb-4">
              <div className="card-header bg-success text-white py-3 px-4 rounded-top-4">
                <h5 className="mb-0 fw-bold">✔️ Critères</h5>
              </div>
              <div className="card-body p-4">
                <ul className="list-unstyled">
                  {["18 à 35 ans", "Résider à Parakou", "Bonne moralité", "Engagement actif"].map((text, i) => (
                    <li key={i} className="d-flex align-items-center mb-3">
                      <i className="bi bi-check2-circle text-success fs-4 me-3"></i>
                      <span className="fw-medium text-dark">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="card border-0 shadow-sm rounded-4 bg-white p-4 text-center">
              <h6 className="fw-bold text-uppercase small text-muted mb-3">Prêt à nous rejoindre ?</h6>
              <p className="small text-secondary mb-4">Préparez votre CV, Lettre de Motivation et Pièce d'Identité en PDF.</p>
              <Link to="/postuler" className="btn btn-primary btn-lg w-100 rounded-pill fw-bold py-3 shadow transition-all hover-lift">
                POSTULER MAINTENANT
              </Link>
            </div>
          </div>
        </div>

        <footer className="text-center mt-5 pt-4 border-top">
          <p className="text-muted small mb-0">
            &copy; 2025 <strong>AMJB</strong> - Ville de Parakou.
          </p>
          <div className="d-flex justify-content-center gap-2 mt-2">
            <div style={{ height: '3px', width: '20px' }} className="bg-success"></div>
            <div style={{ height: '3px', width: '20px' }} className="bg-warning"></div>
            <div style={{ height: '3px', width: '20px' }} className="bg-danger"></div>
          </div>
        </footer>
      </div>
    </div>
  );
}