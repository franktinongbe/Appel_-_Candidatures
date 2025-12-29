import { useState } from 'react';
import { Link } from 'react-router-dom';
// ✅ Import du service API au lieu d'axios directement
import { candidatEndpoints } from '../services/api'; 

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

    // ✅ Préparation des données (FormData pour les fichiers)
    const formData = new FormData();
    formData.append('nom', e.target.nom.value);
    formData.append('telephone', e.target.telephone.value);
    formData.append('email', e.target.email.value);
    formData.append('poste', e.target.poste.value);
    formData.append('cv', e.target.cvFile.files[0]);
    formData.append('identite', e.target.idFile.files[0]);

    try {
      // ✅ UTILISATION DU SERVICE API
      const response = await candidatEndpoints.postuler(formData);

      if (response.status === 200 || response.status === 201) {
        setSuccess(true);
        window.scrollTo(0, 0);
        
        // Notification WhatsApp
        const msg = `*NOUVELLE CANDIDATURE*%0A*Nom:* ${e.target.nom.value}%0A*Poste:* ${e.target.poste.value}`;
        setTimeout(() => window.open(`https://wa.me/22940341969?text=${msg}`, '_blank'), 2000);
      }
    } catch (err) {
      console.error("Erreur d'envoi Cloud:", err);
      // Récupération du message d'erreur du backend s'il existe
      setError(err.response?.data?.message || "Une erreur est survenue lors de l'envoi au serveur.");
    } finally {
      setLoading(false);
    }
  };

  if (success) return (
    <div className="container py-5 text-center">
      <div className="card p-5 shadow-lg border-0 rounded-4 bg-white mx-auto" style={{maxWidth: '600px'}}>
        <div className="mb-4"><i className="bi bi-check-circle-fill text-success" style={{fontSize: '5rem'}}></i></div>
        <h2 className="fw-bold">Dossier Reçu !</h2>
        <p className="text-muted fs-5 mb-4">Votre candidature a été transmise avec succès au serveur Cloud.</p>
        <Link to="/" className="btn btn-primary btn-lg px-5 rounded-pill fw-bold">RETOUR À L'ACCUEIL</Link>
      </div>
    </div>
  );

  return (
    <div className="container py-4">
      {/* ... (Reste du JSX identique à ton formulaire précédent) ... */}
      <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
        <div className="d-flex" style={{height: '6px'}}>
          <div className="flex-grow-1 bg-success"></div>
          <div className="flex-grow-1 bg-warning"></div>
          <div className="flex-grow-1 bg-danger"></div>
        </div>

        <div className="card-header bg-white text-center py-5 border-0">
          <img src="/logo.jpeg" alt="Logo" style={{ width: '80px' }} className="mb-3 rounded-circle shadow-sm" />
          <h3 className="fw-bold text-uppercase">Formulaire de Candidature</h3>
        </div>

        <div className="card-body p-4 pt-0">
          {error && <div className="alert alert-danger border-0 border-start border-danger border-4 mb-4">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="row g-4">
              <div className="col-12">
                <label className="form-label fw-bold small">NOM COMPLET *</label>
                <input type="text" name="nom" className="form-control form-control-lg bg-light" required />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold small">WHATSAPP *</label>
                <input type="tel" name="telephone" className="form-control form-control-lg bg-light" required />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold small">EMAIL *</label>
                <input type="email" name="email" className="form-control form-control-lg bg-light" required />
              </div>

              <div className="col-12">
                <label className="form-label fw-bold text-danger small">POSTE SOUHAITÉ *</label>
                <select name="poste" className="form-select form-select-lg border-danger-subtle" required>
                  <option value="">-- Sélectionnez un poste --</option>
                  {postes.map((group, idx) => (
                    <optgroup key={idx} label={group.cat}>
                      {group.items.map((p, i) => <option key={i} value={p}>{p}</option>)}
                    </optgroup>
                  ))}
                </select>
              </div>

              {/* CV */}
              <div className="col-md-6 text-center">
                <input type="file" id="cvFile" className="d-none" accept=".pdf" onChange={(e) => handleFileChange(e, 'cv')} required />
                <label htmlFor="cvFile" className="d-block p-4 border border-2 border-dashed rounded-3 bg-light cursor-pointer">
                  <i className="bi bi-file-earmark-pdf fs-2 text-danger"></i><br/>
                  <span className="small text-muted">{fileNames.cv || "Joindre CV (PDF)"}</span>
                </label>
              </div>

              {/* ID */}
              <div className="col-md-6 text-center">
                <input type="file" id="idFile" className="d-none" accept=".pdf" onChange={(e) => handleFileChange(e, 'identity')} required />
                <label htmlFor="idFile" className="d-block p-4 border border-2 border-dashed rounded-3 bg-light cursor-pointer">
                  <i className="bi bi-card-heading fs-2 text-primary"></i><br/>
                  <span className="small text-muted">{fileNames.identity || "Joindre Identité (PDF)"}</span>
                </label>
              </div>

              <div className="col-12 mt-5">
                <button type="submit" className="btn btn-success btn-lg w-100 rounded-pill fw-bold" disabled={loading}>
                  {loading ? "ENVOI EN COURS..." : "ENVOYER MON DOSSIER"}
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="bg-dark text-white p-3 text-center small">
          Support technique : +229 01 40 34 19 69
        </div>
      </div>
    </div>
  );
}