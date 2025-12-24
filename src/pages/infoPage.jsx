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
    <div className="bg-light min-vh-100 py-5 d-flex align-items-center">
      <div className="container">
        
        {/* --- EN-TÊTE OFFICIEL --- */}
        <div className="text-center mb-5 animate__animated animate__fadeIn">
          <div className="mb-4 d-inline-block p-2 bg-white rounded-circle shadow">
             <img src="/logo.jpeg" alt="Logo MJB" style={{ height: '140px', width: '140px', objectFit: 'contain' }} className="rounded-circle" />
          </div>
          <h2 className="fw-bold text-dark mb-1">ASSOCIATION MAIRIE DES JEUNES DU BÉNIN</h2>
          <p className="text-success fw-bold mb-0">École d'apprentissage de la gestion du pouvoir public</p>
          <small className="text-muted fw-medium">Autorisation n˚2021/029/PDO/SG/SAG/SA du 10 Mai 2021</small>
          
          <div className="mt-4">
            <h1 className="display-6 fw-bold text-primary mb-0">MAIRIE DES JEUNES DE PARAKOU</h1>
            <div className="badge bg-danger fs-6 px-4 py-2 rounded-pill shadow-sm mt-2">
              📣 APPEL À CANDIDATURE : MANDATURE 2025-2030
            </div>
          </div>
        </div>

        {/* --- SECTION POSTES (LISIBILITÉ MAXIMALE) --- */}
        <div className="row g-4 justify-content-center">
          <div className="col-lg-10">
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
              <div className="card-header bg-dark text-white py-3 px-4 d-flex align-items-center justify-content-between">
                <h4 className="mb-0 fw-bold">📂 RECRUTEMENT DE BÉNÉVOLES</h4>
                <span className="badge bg-warning text-dark px-3">Parakou</span>
              </div>
              
              <div className="card-body p-4 p-md-5 bg-white">
                <div className="row">
                  
                  {/* BUREAU EXÉCUTIF */}
                  <div className="col-md-6 mb-5 mb-md-0">
                    <div className="d-flex align-items-center mb-4 border-bottom border-primary border-3 pb-2">
                      <i className="bi bi-person-badge-fill text-primary fs-3 me-3"></i>
                      <h5 className="fw-bold text-dark mb-0 text-uppercase">Bureau Exécutif</h5>
                    </div>
                    <div className="list-group list-group-flush">
                      {bureaux.map((p, i) => (
                        <div key={i} className="list-group-item px-0 py-3 border-light d-flex align-items-center">
                          <i className="bi bi-check-square-fill text-primary me-3 fs-5"></i>
                          <span className="fw-bold text-dark fs-5">{p}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CHEFS DE SERVICES */}
                  <div className="col-md-6">
                    <div className="d-flex align-items-center mb-4 border-bottom border-success border-3 pb-2">
                      <i className="bi bi-gear-wide-connected text-success fs-3 me-3"></i>
                      <h5 className="fw-bold text-dark mb-0 text-uppercase">Chefs de Services</h5>
                    </div>
                    <div className="pe-2" style={{ maxHeight: '450px', overflowY: 'auto' }}>
                      {services.map((s, i) => (
                        <div key={i} className="list-group-item px-0 py-3 border-light d-flex align-items-start">
                          <i className="bi bi-arrow-right-circle-fill text-success me-3 fs-5 mt-1"></i>
                          <span className="fw-bold text-dark fs-5">{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              {/* SECTION ACTION FINALE */}
              <div className="card-footer bg-light border-0 p-4 text-center">
                <div className="mb-4">
                  <h5 className="fw-bold text-dark mb-2">Objectif de la mandature :</h5>
                  <p className="text-secondary mx-auto" style={{ maxWidth: '700px' }}>
                    Renforcer l’organisation administrative et technique afin de contribuer efficacement au développement participatif, citoyen et durable de la commune de Parakou.
                  </p>
                </div>
                <Link to="/postuler" className="btn btn-primary btn-xl px-5 py-3 rounded-pill fw-bold shadow pulse-button">
                  CLIQUEZ ICI POUR POSTULER <i className="bi bi-cursor-fill ms-2"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* --- FOOTER --- */}
        <footer className="text-center mt-5">
          <p className="text-muted fw-bold mb-0">
            &copy; 2025 AMJB - VILLE DE PARAKOU
          </p>
          <div className="d-flex justify-content-center gap-2 mt-2">
            <div style={{ height: '6px', width: '40px' }} className="bg-success rounded"></div>
            <div style={{ height: '6px', width: '40px' }} className="bg-warning rounded"></div>
            <div style={{ height: '6px', width: '40px' }} className="bg-danger rounded"></div>
          </div>
        </footer>

      </div>

      <style>{`
        .btn-xl { font-size: 1.25rem; }
        .fw-bold { color: #212529 !important; } /* Force le noir profond pour la lisibilité */
        .list-group-item { background: transparent; }
        .pulse-button {
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(13, 110, 253, 0.4); }
          70% { transform: scale(1.05); box-shadow: 0 0 0 15px rgba(13, 110, 253, 0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(13, 110, 253, 0); }
        }
      `}</style>
    </div>
  );
}