import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function InfoPage() {
  const targetDate = new Date('2026-01-12T00:00:00').getTime();
  const [timeLeft, setTimeLeft] = useState(targetDate - new Date().getTime());
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance < 0) {
        clearInterval(timer);
        setIsExpired(true);
        setTimeLeft(0);
      } else {
        setTimeLeft(distance);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

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
    <div className="bg-light min-vh-100 py-3 py-md-5">
      <div className="container">
        
        {/* --- EN-TÊTE --- */}
        <div className="text-center mb-4 mb-md-5">
          <div className="mb-3 d-inline-block p-2 bg-white rounded-circle shadow">
             <img src="/logo.jpeg" alt="Logo MJB" className="rounded-circle logo-img" />
          </div>
          <h2 className="fw-bold text-dark mb-1 fs-4 fs-md-2 px-2">ASSOCIATION MAIRIE DES JEUNES DU BÉNIN</h2>
          <p className="text-success fw-bold mb-0 small px-2 text-uppercase">École d'apprentissage de la gestion du pouvoir public</p>
          <small className="text-muted d-block mt-1">Autorisation n˚2021/029/PDO/SG/SAG/SA du 10 Mai 2021</small>
          
          <div className="mt-4 px-2">
            <h1 className="fw-bold text-primary mb-2 responsive-h1">MAIRIE DES JEUNES DE PARAKOU</h1>
            <div className="badge bg-danger text-wrap p-3 rounded-4 shadow-sm mt-2 w-100 w-md-auto" style={{ maxWidth: '600px' }}>
              <span className="fs-6">📣 APPEL À CANDIDATURE : MANDATURE 2025-2030</span>
              <div className="small opacity-75 mt-1">Du 30 décembre au 12 janvier 2026</div>
            </div>
          </div>

          {/* --- COMPTE À REBOURS --- */}
          {!isExpired ? (
            <div className="mt-4 d-flex justify-content-center flex-wrap gap-2 px-2">
              {[ {v: days, l: 'Jours'}, {v: hours, l: 'Heures'}, {v: minutes, l: 'Min'}, {v: seconds, l: 'Sec'} ].map((item, idx) => (
                <div key={idx} className="bg-success text-white p-2 rounded shadow-sm timer-box">
                  <div className="fs-3 fw-bold lh-1">{item.v}</div>
                  <small style={{fontSize: '0.7rem'}}>{item.l}</small>
                </div>
              ))}
            </div>
          ) : (
            <div className="alert alert-danger mt-4 fw-bold mx-2">🛑 Délai expiré le 12 Janvier 2026</div>
          )}
        </div>

        {/* --- SECTION POSTES --- */}
        <div className="row g-4 justify-content-center mx-1">
          <div className="col-12 col-lg-10">
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
              {/* HEADER MODIFIÉ POUR LA VISIBILITÉ DU BLANC */}
              <div className="card-header bg-success py-3 px-3 px-md-4 d-flex flex-column flex-md-row align-items-center justify-content-between text-center text-md-start">
                <h4 className="mb-2 mb-md-0 fw-bold fs-5 text-white header-title">
                  📂 RECRUTEMENT DE BÉNÉVOLES (18-35 ans)
                </h4>
                <span className="badge bg-warning text-dark px-3 py-2 rounded-pill shadow-sm">Parakou</span>
              </div>
              
              <div className="card-body p-3 p-md-5 bg-white">
                <div className="row g-4">
                  <div className="col-12 col-md-6">
                    <div className="d-flex align-items-center mb-3 border-bottom border-primary border-3 pb-2">
                      <i className="bi bi-person-badge-fill text-primary fs-4 me-2"></i>
                      <h5 className="fw-bold text-dark mb-0 text-uppercase fs-6">Bureau Exécutif</h5>
                    </div>
                    <div className="list-group list-group-flush">
                      {bureaux.map((p, i) => (
                        <div key={i} className="list-group-item px-0 py-2 border-light d-flex align-items-center bg-transparent">
                          <i className="bi bi-check-circle-fill text-primary me-2"></i>
                          <span className="text-dark fw-medium small-md">{p}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="col-12 col-md-6">
                    <div className="d-flex align-items-center mb-3 border-bottom border-success border-3 pb-2">
                      <i className="bi bi-gear-wide-connected text-success fs-4 me-2"></i>
                      <h5 className="fw-bold text-dark mb-0 text-uppercase fs-6">Chefs de Services</h5>
                    </div>
                    <div className="pe-1 custom-scroll" style={{ maxHeight: '350px', overflowY: 'auto' }}>
                      {services.map((s, i) => (
                        <div key={i} className="list-group-item px-0 py-2 border-light d-flex align-items-start bg-transparent">
                          <i className="bi bi-arrow-right-short text-success me-1 fs-4 mt-n1"></i>
                          <span className="text-dark fw-medium small-md">{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-footer bg-light border-0 p-4 text-center">
                <div className="mb-4">
                  <h6 className="fw-bold text-dark text-uppercase">Objectif :</h6>
                  <p className="text-secondary small mb-0 mx-auto" style={{ maxWidth: '600px' }}>
                    Renforcer l’organisation administrative et technique pour le développement participatif de Parakou.
                  </p>
                </div>
                
                {!isExpired ? (
                  <Link to="/postuler" className="btn btn-primary w-100 w-md-auto px-md-5 py-3 rounded-pill fw-bold shadow pulse-button">
                    POSTULER ICI <i className="bi bi-cursor-fill ms-2"></i>
                  </Link>
                ) : (
                  <button className="btn btn-secondary w-100 w-md-auto px-5 py-3 rounded-pill fw-bold" disabled>
                    CANDIDATURES CLOSES
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* --- FOOTER --- */}
        <footer className="text-center mt-5 mb-4">
          <p className="text-muted fw-bold mb-2 small">&copy; 2025 AMJB - VILLE DE PARAKOU</p>
          <div className="d-flex justify-content-center gap-1">
            <div className="color-bar bg-success"></div>
            <div className="color-bar bg-warning"></div>
            <div className="color-bar bg-danger"></div>
          </div>
        </footer>

      </div>

      <style>{`
        /* Assure que le titre du header est bien blanc et visible */
        .header-title {
          color: #ffffff !important;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
        }

        .logo-img { height: 90px; width: 90px; object-fit: contain; }
        @media (min-width: 768px) { .logo-img { height: 130px; width: 130px; } }
        
        .responsive-h1 { font-size: 1.4rem; }
        @media (min-width: 768px) { .responsive-h1 { font-size: 2.3rem; } }

        .timer-box { min-width: 60px; flex: 1; max-width: 85px; text-align: center; }
        
        .custom-scroll::-webkit-scrollbar { width: 4px; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #198754; border-radius: 10px; }

        .pulse-button { animation: pulse 2s infinite; font-size: 1rem; border: none; }
        @keyframes pulse {
          0% { transform: scale(1); }
          70% { transform: scale(1.03); box-shadow: 0 0 0 10px rgba(13, 110, 253, 0); }
          100% { transform: scale(1); }
        }
        
        .small-md { font-size: 0.9rem; line-height: 1.2; }
        @media (min-width: 768px) { .small-md { font-size: 1.05rem; } }

        .color-bar { height: 4px; width: 30px; border-radius: 2px; }
      `}</style>
    </div>
  );
}