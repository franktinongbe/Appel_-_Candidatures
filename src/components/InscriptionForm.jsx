import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function InscriptionForm() {
  const [success, setSuccess] = useState(false);

  const postes = [
    { cat: "Bureau Exécutif", items: ["Directeur de Cabinet", "Chargé(e) de la Communication", "Secrétaire Général(e)", "Secrétaire Général(e) Adjoint(e)", "Trésorier(ère) Général(e)", "Trésorier(ère) Adjoint(e)", "Chef(fe) de Projet"] },
    { cat: "Chefs de Services", items: ["Environnement & Assainissement", "Sports & Loisirs", "Entrepreneuriat & Emploi des Jeunes", "Informatique & Numérique", "Agriculture", "Santé & Éducation Sexuelle", "Genre & Affaires Sociales", "Culture, Patrimoine & Tourisme", "Éducation & Relations Institutionnelles"] }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const nom = e.target.nom.value;
    const tel = e.target.telephone.value;
    const email = e.target.email.value;
    const poste = e.target.poste.value;

    const msg = `*NOUVELLE CANDIDATURE - MJB*%0A` +
                `----------------------------%0A` +
                `*Nom:* ${nom}%0A` +
                `*Poste:* ${poste}%0A` +
                `*Contact:* ${tel}%0A` +
                `*Email:* ${email}%0A` +
                `----------------------------%0A` +
                `_Je vous envoie ci-joint mon CV et ma pièce d'identité._`;

    const monNumero = "22940341969";

    // Ouvre WhatsApp dans un nouvel onglet
    window.open(`https://wa.me/${monNumero}?text=${msg}`, '_blank');
    
    // Affiche la page de succès
    setSuccess(true);
    window.scrollTo(0, 0);
  };

  if (success) return (
    <div className="container py-5">
      <div className="card shadow-lg border-0 rounded-4 overflow-hidden mx-auto" style={{ maxWidth: '600px' }}>
        <div className="bg-success py-4 text-center">
          <i className="bi bi-whatsapp text-white" style={{ fontSize: '4rem' }}></i>
        </div>
        <div className="card-body p-4 text-center">
          <h2 className="fw-bold text-success">Presque fini !</h2>
          <p className="text-muted mb-4">Votre formulaire a été généré. Pour valider votre candidature, suivez ces 2 étapes sur WhatsApp :</p>
          
          <div className="text-start bg-light p-3 rounded-3 mb-4">
            <div className="d-flex align-items-center mb-3">
              <span className="badge bg-success rounded-circle me-3">1</span>
              <span>Envoyez le message texte déjà prêt dans la discussion.</span>
            </div>
            <div className="d-flex align-items-center">
              <span className="badge bg-success rounded-circle me-3">2</span>
              <span>Cliquez sur l'icône 📎 (trombone) pour joindre votre <b>CV</b> et votre <b>ID</b>.</span>
            </div>
          </div>

          <button onClick={() => setSuccess(false)} className="btn btn-outline-success rounded-pill px-4 me-2">
            <i className="bi bi-pencil-square me-2"></i>Modifier infos
          </button>
          <Link to="/" className="btn btn-success rounded-pill px-4">
            <i className="bi bi-house-door me-2"></i>Accueil
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container py-4">
      <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
        <div className="d-flex" style={{ height: '6px' }}>
          <div className="flex-grow-1 bg-success"></div>
          <div className="flex-grow-1 bg-warning"></div>
          <div className="flex-grow-1 bg-danger"></div>
        </div>

        <div className="card-header bg-white text-center py-5 border-0">
          <img src="/logo.jpeg" alt="Logo" style={{ width: '80px' }} className="mb-3 rounded-circle shadow-sm" />
          <h3 className="fw-bold text-uppercase mb-0">Candidature Rapide</h3>
          <p className="text-muted small">Mairie des Jeunes de Parakou</p>
        </div>

        <div className="card-body p-4 pt-0">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-12">
                <label className="form-label small fw-bold text-secondary">NOM COMPLET</label>
                <input type="text" name="nom" className="form-control form-control-lg border-0 bg-light" placeholder="Ex: Koffi DURAND" required />
              </div>

              <div className="col-md-6">
                <label className="form-label small fw-bold text-secondary">WHATSAPP</label>
                <input type="tel" name="telephone" className="form-control form-control-lg border-0 bg-light" placeholder="+229..." required />
              </div>

              <div className="col-md-6">
                <label className="form-label small fw-bold text-secondary">EMAIL</label>
                <input type="email" name="email" className="form-control form-control-lg border-0 bg-light" placeholder="email@exemple.com" required />
              </div>

              <div className="col-12">
                <label className="form-label small fw-bold text-danger">POSTE SOUHAITÉ</label>
                <select name="poste" className="form-select form-select-lg border-danger-subtle bg-light" required>
                  <option value="">-- Sélectionnez un poste --</option>
                  {postes.map((group, idx) => (
                    <optgroup key={idx} label={group.cat}>
                      {group.items.map((p, i) => <option key={i} value={p}>{p}</option>)}
                    </optgroup>
                  ))}
                </select>
              </div>

              <div className="col-12 mt-4">
                <div className="alert alert-info border-0 shadow-sm rounded-3 d-flex align-items-center">
                  <i className="bi bi-info-circle-fill fs-4 me-3"></i>
                  <span className="small">Le bouton ci-dessous ouvrira WhatsApp. Vous devrez y envoyer vos fichiers (CV et ID).</span>
                </div>
              </div>

              <button type="submit" className="btn btn-success btn-lg w-100 rounded-pill fw-bold py-3 shadow-sm mt-3">
                POSTULER VIA WHATSAPP <i className="bi bi-whatsapp ms-2"></i>
              </button>
            </div>
          </form>
        </div>
        <div className="bg-dark text-white p-3 text-center small">
          MJB Digital Connect - Parakou 🇧🇯
        </div>
      </div>
    </div>
  );
}