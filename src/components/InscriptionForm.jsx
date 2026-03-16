import { useState } from 'react';

const DOMAINES = ['Communication', 'Numérique', 'Événementiel', 'Environnement', 'Entrepreneuriat', 'Sport'];

export default function InscriptionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nomPrenoms: '', age: '', sexe: '', whatsapp: '', quartier: '',
    profession: '', niveauEtude: '', motivation: '', domaines: [],
    experienceBenevole: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleDomaine = (dom) => {
    setFormData(prev => ({
      ...prev,
      domaines: prev.domaines.includes(dom)
        ? prev.domaines.filter(d => d !== dom)
        : [...prev.domaines, dom]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nomPrenoms || !formData.age || !formData.sexe || !formData.experienceBenevole) {
      alert('Veuillez remplir les champs obligatoires (*).');
      return;
    }
    
    setIsSubmitting(true);
    const message = `*NOUVELLE CANDIDATURE MJB*%0A%0A` +
      `*Nom :* ${formData.nomPrenoms}%0A*Âge :* ${formData.age}%0A*Sexe :* ${formData.sexe}%0A` +
      `*WhatsApp :* ${formData.whatsapp}%0A*Quartier :* ${formData.quartier}%0A` +
      `*Domaines :* ${formData.domaines.join(', ')}%0A` +
      `*Déjà bénévole :* ${formData.experienceBenevole}`;

    window.location.href = `https://wa.me/2290140341969?text=${message}`;
    setTimeout(() => setIsSubmitting(false), 2000);
  };

  return (
    <div style={styles.wrap}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>Rejoindre la <span style={styles.titleGold}>MJB</span></h1>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <SectionLabel>Identité</SectionLabel>
          <div style={styles.grid2}>
            <input name="nomPrenoms" placeholder="Nom complet *" onChange={handleChange} style={styles.input} required />
            <input name="age" type="number" placeholder="Âge *" onChange={handleChange} style={styles.input} required />
          </div>

          <SectionLabel>Domaines d'intérêt</SectionLabel>
          <div style={styles.chipsGrid}>
            {DOMAINES.map(dom => (
              <div key={dom} onClick={() => toggleDomaine(dom)} 
                   style={{...styles.chip, ...(formData.domaines.includes(dom) ? styles.chipActive : {})}}>
                {dom}
              </div>
            ))}
          </div>

          <SectionLabel>Déjà bénévole ? *</SectionLabel>
          <div style={styles.chipsGrid}>
            {['Oui', 'Non'].map(val => (
              <div key={val} onClick={() => setFormData(p => ({ ...p, experienceBenevole: val }))} 
                   style={{...styles.chip, ...(formData.experienceBenevole === val ? styles.chipActive : {})}}>
                {val}
              </div>
            ))}
          </div>

          <button type="submit" disabled={isSubmitting} style={styles.btn}>
            {isSubmitting ? "Envoi en cours..." : "Soumettre la candidature"}
          </button>
        </form>
      </div>
    </div>
  );
}

const SectionLabel = ({ children }) => <div style={styles.sectionLabel}>{children}</div>;

const styles = {
  wrap: { fontFamily: "'Inter', sans-serif", background: '#0B1D3A', minHeight: '100vh', padding: '20px', display: 'flex', alignItems: 'center' },
  card: { maxWidth: 500, margin: '0 auto', width: '100%' },
  header: { textAlign: 'center', marginBottom: '20px' },
  title: { color: '#fff', fontSize: 24 },
  titleGold: { color: '#D4AF37' },
  form: { background: 'rgba(255,255,255,0.05)', padding: '25px', borderRadius: 20 },
  sectionLabel: { color: '#D4AF37', fontSize: 10, textTransform: 'uppercase', marginBottom: '10px', marginTop: '20px', letterSpacing: '1px' },
  grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' },
  input: { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '12px', color: '#fff' },
  chipsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '8px' },
  chip: { background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: 8, cursor: 'pointer', textAlign: 'center', color: '#ccc', fontSize: 12, transition: '0.3s' },
  chipActive: { background: '#D4AF37', color: '#0B1D3A', fontWeight: 'bold' },
  btn: { width: '100%', padding: '15px', borderRadius: 10, border: 'none', background: '#D4AF37', color: '#0B1D3A', fontWeight: 'bold', marginTop: '25px', cursor: 'pointer' }
};
