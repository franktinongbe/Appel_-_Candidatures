import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function InfoPage() {
  // Mise à jour : Fin des adhésions dans 1 mois (ex: 14 Avril 2026)
  const targetDate = new Date('2026-04-14T23:59:59').getTime();
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

  // Nouveaux domaines basés sur votre formulaire d'adhésion
  const domainesEngagement = [
    "Communication & Médias", 
    "Numérique & Innovation",
    "Organisation d'événements", 
    "Environnement & Climat",
    "Entrepreneuriat Jeunes", 
    "Sport, Culture & Loisirs"
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
          <p className="text-success fw-bold mb-0 small px-2 text-uppercase">Citoyenneté - Leadership - Développement</p>
          
          <div className="mt-4 px-2">
            <h1 className="fw-bold text-primary mb-2 responsive-h1">MAIRIE DES JEUNES DE PARAKOU</h1>
            <div className="badge bg-primary text-wrap p-3 rounded-4 shadow-sm mt-2 w-100 w-md-auto" style={{ maxWidth: '600px' }}>
              <span className="fs-6">📝 APPEL A ADHÉSION : ÉDITION 2026</span>
              <div className="small opacity-75 mt-1 text-white">Rejoignez le mouvement pour Parakou</div>
            </div>
          </div>

          {/* --- COMPTE À REBOURS --- */}
          {!isExpired ? (
            <div className="mt-4 d-flex justify-content-center flex-wrap gap-2 px-2">
              {[ {v: days, l: 'Jours'}, {v: hours, l: 'Heures'}, {v: minutes, l: 'Min'}, {v: seconds, l: 'Sec'} ].map((item, idx) => (
                <div key={idx} className="bg-dark text-white p-2 rounded shadow-sm timer-box">
                  <div className="fs-3 fw-bold lh-1">{item.v}</div>
                  <small style={{fontSize: '0.7rem'}}>{item.l}</small>
                </div>
              ))}
            </div>
          ) : (
            <div className="alert alert-danger mt-4 fw-bold mx-2"> Les adhésions en ligne continues.</div>
          )}
        </div>

        {/* --- SECTION INFOS --- */}
        <div className="row g-4 justify-content-center mx-1">
          <div className="col-12 col-lg-8">
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
              <div className="card-header bg-primary py-3 px-4 text-center">
                <h4 className="mb-0 fw-bold fs-5 text-white header-title">
                  🤝 POURQUOI NOUS REJOINDRE ?
                </h4>
              </div>
              
              <div className="card-body p-4 p-md-5 bg-white">
                <p className="text-center text-muted mb-4">
                  La Mairie des Jeunes de Parakou est un cadre d'engagement citoyen et de formation pour les leaders de demain.
                </p>
                
                <div className="row g-3">
                  <h6 className="fw-bold text-primary text-center mb-3 text-uppercase">Nos Domaines d'Action :</h6>
                  {domainesEngagement.map((dom, i) => (
                    <div key={i} className="col-12 col-md-6">
                      <div className="d-flex align-items-center p-3 bg-light rounded-3">
                        <i className="bi bi-check-all text-success fs-4 me-2"></i>
                        <span className="text-dark fw-medium">{dom}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card-footer bg-light border-0 p-4 text-center">
                <div className="mb-4">
                  <h6 className="fw-bold text-dark">Condition : Être prêt à contribuer activement !</h6>
                </div>
                
                {!isExpired ? (
                  <Link to="/postuler" className="btn btn-success w-100 w-md-auto px-md-5 py-3 rounded-pill fw-bold shadow pulse-button">
                    REMPLIR LE FORMULAIRE <i className="bi bi-pencil-square ms-2"></i>
                  </Link>
                ) : (
                  <button className="btn btn-secondary w-100 w-md-auto px-5 py-3 rounded-pill fw-bold" disabled>
                    SESSION TERMINÉE
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* --- FOOTER --- */}
        <footer className="text-center mt-5 mb-4">
          <p className="text-muted fw-bold mb-2 small">&copy; 2026 MAIRIE DES JEUNES DE PARAKOU</p>
          <div className="d-flex justify-content-center gap-1">
            <div className="color-bar bg-success"></div>
            <div className="color-bar bg-warning"></div>
            <div className="color-bar bg-danger"></div>
          </div>
        </footer>

      </div>

      <style>{`
        .header-title { color: #ffffff !important; }
        .logo-img { height: 90px; width: 90px; object-fit: contain; }
        @media (min-width: 768px) { .logo-img { height: 120px; width: 120px; } }
        
        .responsive-h1 { font-size: 1.4rem; }
        @media (min-width: 768px) { .responsive-h1 { font-size: 2.1rem; } }

        .timer-box { min-width: 65px; flex: 1; max-width: 90px; text-align: center; }

        .pulse-button { animation: pulse 2s infinite; }
        @keyframes pulse {
          0% { transform: scale(1); }
          70% { transform: scale(1.03); box-shadow: 0 0 0 10px rgba(25, 135, 84, 0); }
          100% { transform: scale(1); }
        }
        
        .color-bar { height: 4px; width: 30px; border-radius: 2px; }
      `}</style>
    </div>
  );
}
