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
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    
    setIsSubmitting(true);
    const message = `*CANDIDATURE MJB*%0A%0A*Nom:* ${formData.nomPrenoms}%0A*Âge:* ${formData.age}%0A*Sexe:* ${formData.sexe}%0A*WhatsApp:* ${formData.whatsapp}%0A*Domaines:* ${formData.domaines.join(', ')}%0A*Déjà bénévole:* ${formData.experienceBenevole}`;
    window.location.href = `https://wa.me/2290140341969?text=${message}`;
    setTimeout(() => setIsSubmitting(false), 2000);
  };

  return (
    <div style={styles.wrap}>
      <div style={styles.card}>
        <div style={styles.header}>
          <span style={styles.badge}>Parakou — Bénin</span>
          <h1 style={styles.title}>Rejoindre la <span style={styles.titleGold}>MJB</span></h1>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <Field label="Nom et prénoms *">
            <input name="nomPrenoms" onChange={handleChange} style={styles.input} required />
          </Field>
          
          <div style={styles.grid2}>
            <Field label="Âge *"><input name="age" type="number" onChange={handleChange} style={styles.input} required /></Field>
            <Field label="Sexe *">
              <select name="sexe" onChange={handleChange} style={styles.input} required defaultValue="">
                <option value="" disabled>Choisir...</option>
                <option value="M">Masculin</option>
                <option value="F">Féminin</option>
              </select>
            </Field>
          </div>

          <SectionLabel>Domaines d'intérêt</SectionLabel>
          <div style={styles.chipGrid}>
            {DOMAINES.map(dom => (
              <div key={dom} onClick={() => toggleDomaine(dom)} 
                   style={{...styles.chip, ...(formData.domaines.includes(dom) ? styles.chipActive : {})}}>
                {dom}
              </div>
            ))}
          </div>

          <SectionLabel>Déjà bénévole ? *</SectionLabel>
          <div style={styles.chipGrid}>
            {['Oui', 'Non'].map(val => (
              <div key={val} onClick={() => setFormData(p => ({ ...p, experienceBenevole: val }))} 
                   style={{...styles.chip, ...(formData.experienceBenevole === val ? styles.chipActive : {})}}>
                {val}
              </div>
            ))}
          </div>

          <button type="submit" disabled={isSubmitting} style={styles.btn}>
            {isSubmitting ? "Envoi..." : "Soumettre la candidature"}
          </button>
        </form>
      </div>
    </div>
  );
}

const SectionLabel = ({ children }) => <div style={styles.sectionLabel}>{children}</div>;
const Field = ({ label, children }) => <div style={{ marginBottom: '1rem' }}>
  <label style={styles.fieldLabel}>{label}</label>{children}
</div>;

const styles = {
  wrap: { fontFamily: "'Inter', sans-serif", background: '#0B1D3A', minHeight: '100vh', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  card: { maxWidth: 500, width: '100%', background: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: 24, border: '1px solid rgba(255,255,255,0.05)' },
  header: { textAlign: 'center', marginBottom: '2rem' },
  badge: { background: 'rgba(212,175,55,0.15)', color: '#D4AF37', padding: '4px 12px', borderRadius: 20, fontSize: 10, textTransform: 'uppercase' },
  title: { color: '#fff', fontSize: 22, marginTop: '10px' },
  titleGold: { color: '#D4AF37' },
  form: { display: 'flex', flexDirection: 'column' },
  sectionLabel: { color: '#D4AF37', fontSize: 10, textTransform: 'uppercase', margin: '15px 0 10px', letterSpacing: '0.5px' },
  grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 },
  fieldLabel: { fontSize: 11, color: 'rgba(255,255,255,0.5)', marginBottom: 5, display: 'block' },
  input: { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '12px', color: '#fff', width: '100%', boxSizing: 'border-box' },
  chipGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: 8 },
  chip: { background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: 10, cursor: 'pointer', textAlign: 'center', color: '#fff', fontSize: 12, transition: '0.3s' },
  chipActive: { background: '#D4AF37', color: '#0B1D3A', fontWeight: 'bold' },
  btn: { width: '100%', padding: 16, borderRadius: 12, border: 'none', background: '#D4AF37', color: '#0B1D3A', fontWeight: 700, marginTop: '2rem', cursor: 'pointer' }
};
