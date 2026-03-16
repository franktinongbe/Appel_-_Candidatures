import { useState } from 'react';

const DOMAINES = ['Communication', 'Numérique', 'Événementiel', 'Environnement', 'Entrepreneuriat', 'Sport'];

export default function InscriptionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nomPrenoms: '', age: '', sexe: '', whatsapp: '', quartier: '',
    profession: '', niveauEtude: '', motivation: '', domaines: [],
    experienceBenevole: ''
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
    if (!formData.nomPrenoms || !formData.age || !formData.sexe) {
      alert('Veuillez remplir les champs obligatoires (*).');
      return;
    }
    const phoneRegex = /^[0-9]{8}$/;
    if (!phoneRegex.test(formData.whatsapp.replace(/\s/g, ''))) {
      alert('Numéro WhatsApp invalide — 8 chiffres requis.');
      return;
    }
    
    setIsSubmitting(true);

    const message = `*NOUVELLE CANDIDATURE MJB*%0A%0A` +
      `*Nom et prénoms :* ${formData.nomPrenoms}%0A` +
      `*Âge :* ${formData.age}%0A` +
      `*Sexe :* ${formData.sexe}%0A` +
      `*WhatsApp :* ${formData.whatsapp}%0A` +
      `*Quartier :* ${formData.quartier}%0A` +
      `*Niveau d'étude :* ${formData.niveauEtude}%0A` +
      `*Profession :* ${formData.profession}%0A` +
      `*Motivation :* ${formData.motivation}%0A` +
      `*Domaines :* ${formData.domaines.join(', ')}%0A` +
      `*Bénévole :* ${formData.experienceBenevole}%0A%0A` +
      `---%0A*Lien du groupe :* https://chat.whatsapp.com/Czznaibnrdc8PXnkXrYS1R`;

    window.location.href = `https://wa.me/2290140341969?text=${message}`;
    
    setTimeout(() => setIsSubmitting(false), 2000);
  };

  return (
    <div style={styles.wrap}>
      <div style={styles.glowTop} />
      <div style={styles.glowBottom} />
      <div style={styles.card}>
        <div style={styles.header}>
          <span style={styles.badge}>Parakou — Bénin</span>
          <h1 style={styles.title}>Rejoindre la <span style={styles.titleGold}>Mairie des Jeunes</span></h1>
          <p style={styles.subtitle}>Formulaire d'adhésion officiel · Promotion 2026</p>
          <div style={styles.divider} />
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <SectionLabel>Identité</SectionLabel>
          <div style={styles.grid2}>
            <Field label="Nom et prénoms *">
              <input name="nomPrenoms" placeholder="Ex : Marie Thérèse Koto" onChange={handleChange} style={styles.input} required />
            </Field>
            <Field label="Âge *">
              <input name="age" type="number" placeholder="Ex : 22" onChange={handleChange} style={styles.input} required />
            </Field>
            <Field label="Sexe *">
              <select name="sexe" onChange={handleChange} style={styles.input} required defaultValue="">
                <option value="" disabled>Choisir...</option>
                <option value="M">Masculin</option>
                <option value="F">Féminin</option>
              </select>
            </Field>
            <Field label="WhatsApp *">
              <input name="whatsapp" placeholder="Ex : 97000000" onChange={handleChange} style={styles.input} required />
            </Field>
          </div>

          <SectionLabel>Profil</SectionLabel>
          <div style={{ ...styles.grid2, marginBottom: '1.5rem' }}>
            <Field label="Quartier"><input name="quartier" onChange={handleChange} style={styles.input} /></Field>
            <Field label="Niveau d'étude"><input name="niveauEtude" onChange={handleChange} style={styles.input} /></Field>
            <div style={{ gridColumn: 'span 2' }}>
              <Field label="Profession / Activité"><input name="profession" onChange={handleChange} style={styles.input} /></Field>
            </div>
          </div>

          <SectionLabel>Engagement</SectionLabel>
          <Field label="Pourquoi nous rejoindre ?" style={{ marginBottom: '1.5rem' }}>
            <textarea name="motivation" onChange={handleChange} style={{ ...styles.input, height: 88, resize: 'none' }} />
          </Field>

          <SectionLabel>Domaines d'intérêt</SectionLabel>
          <div style={styles.checkboxGrid}>
            {DOMAINES.map(dom => (
              <label key={dom} onClick={() => toggleDomaine(dom)} style={{ ...styles.cbLabel, ...(formData.domaines.includes(dom) ? styles.cbLabelChecked : {}) }}>
                {dom}
              </label>
            ))}
          </div>

          <SectionLabel>Bénévolat</SectionLabel>
          <div style={styles.radioRow}>
            <span>Déjà bénévole ?</span>
            <div style={styles.radios}>
              {['Oui', 'Non'].map(val => (
                <label key={val} onClick={() => setFormData(p => ({ ...p, experienceBenevole: val }))} style={styles.radioLabel}>
                  {val}
                </label>
              ))}
            </div>
          </div>

          <button type="submit" disabled={isSubmitting} style={styles.btn}>
            {isSubmitting ? "Envoi en cours..." : "Soumettre via WhatsApp →"}
          </button>
        </form>
      </div>
    </div>
  );
}

function SectionLabel({ children }) {
  return <div style={styles.sectionLabel}>{children}<span style={styles.sectionLine} /></div>;
}

function Field({ label, children }) {
  return <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
    <label style={styles.fieldLabel}>{label}</label>{children}
  </div>;
}

const styles = {
  wrap: { fontFamily: "'DM Sans', sans-serif", background: '#0B1D3A', minHeight: '100vh', padding: '2rem 1rem' },
  card: { maxWidth: 660, margin: '0 auto' },
  header: { textAlign: 'center', marginBottom: '2rem' },
  badge: { background: 'rgba(212,175,55,0.15)', color: '#D4AF37', padding: '6px 18px', borderRadius: 100, fontSize: 11, textTransform: 'uppercase' },
  title: { color: '#fff', fontSize: 28, margin: '1rem 0' },
  titleGold: { color: '#D4AF37' },
  subtitle: { color: 'rgba(255,255,255,0.45)', fontSize: 13 },
  divider: { width: 48, height: 2, background: '#D4AF37', margin: '1rem auto' },
  form: { background: 'rgba(255,255,255,0.04)', padding: '2rem', borderRadius: 20 },
  sectionLabel: { color: '#D4AF37', fontSize: 10, textTransform: 'uppercase', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 10 },
  sectionLine: { flex: 1, height: 1, background: 'rgba(212,175,55,0.2)' },
  grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: '1rem' },
  fieldLabel: { fontSize: 11, color: 'rgba(255,255,255,0.45)' },
  input: { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '11px', color: '#fff', width: '100%', outline: 'none' },
  checkboxGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: '1.5rem' },
  cbLabel: { background: 'rgba(255,255,255,0.04)', padding: '10px', borderRadius: 10, cursor: 'pointer', textAlign: 'center', color: '#fff', fontSize: 12 },
  cbLabelChecked: { background: '#D4AF37', color: '#0B1D3A' },
  radioRow: { background: 'rgba(255,255,255,0.04)', padding: '14px', borderRadius: 10, display: 'flex', justifyContent: 'space-between', color: '#fff', marginBottom: '1.5rem' },
  radioLabel: { cursor: 'pointer', marginLeft: '10px' },
  btn: { width: '100%', padding: 15, borderRadius: 12, border: 'none', background: '#D4AF37', color: '#0B1D3A', fontWeight: 700, cursor: 'pointer' }
};
