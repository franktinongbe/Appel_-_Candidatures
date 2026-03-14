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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nomPrenoms || !formData.age || !formData.sexe) {
      alert('Veuillez remplir tous les champs obligatoires (*).');
      return;
    }
    const phoneRegex = /^[0-9]{8}$/;
    if (!phoneRegex.test(formData.whatsapp.replace(/\s/g, ''))) {
      alert('Numéro WhatsApp invalide — 8 chiffres requis.');
      return;
    }
    setIsSubmitting(true);
    console.log('Données :', formData);
    await new Promise(resolve => setTimeout(resolve, 1500));
    window.location.href = 'https://chat.whatsapp.com/Czznaibnrdc8PXnkXrYS1R';
  };

  return (
    <div style={styles.wrap}>
      <div style={styles.glowTop} />
      <div style={styles.glowBottom} />

      <div style={styles.card}>
        {/* Header */}
        <div style={styles.header}>
          <span style={styles.badge}>Parakou — Bénin</span>
          <h1 style={styles.title}>
            Rejoindre la <span style={styles.titleGold}>Mairie des Jeunes</span>
          </h1>
          <p style={styles.subtitle}>Formulaire d'adhésion officiel · Promotion 2025</p>
          <div style={styles.divider} />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={styles.form}>

          {/* Section Identité */}
          <SectionLabel>Identité</SectionLabel>
          <div style={styles.grid2}>
            <Field label="Nom et prénoms *">
              <input name="nomPrenoms" placeholder="Ex : Adjoua Marie Koto" onChange={handleChange} style={styles.input} required />
            </Field>
            <Field label="Âge *">
              <input name="age" type="number" placeholder="Ex : 22" min="14" max="35" onChange={handleChange} style={styles.input} required />
            </Field>
            <Field label="Sexe *">
              <select name="sexe" onChange={handleChange} style={styles.input} required defaultValue="">
                <option value="" disabled>Choisir...</option>
                <option value="M">Masculin</option>
                <option value="F">Féminin</option>
              </select>
            </Field>
            <Field label="WhatsApp *">
              <input name="whatsapp" placeholder="Ex : 97000000" maxLength={10} onChange={handleChange} style={styles.input} required />
            </Field>
          </div>

          {/* Section Profil */}
          <SectionLabel>Localisation & Profil</SectionLabel>
          <div style={{ ...styles.grid2, marginBottom: '1.5rem' }}>
            <Field label="Quartier / Arrondissement">
              <input name="quartier" placeholder="Ex : Banikanni" onChange={handleChange} style={styles.input} />
            </Field>
            <Field label="Niveau d'étude">
              <input name="niveauEtude" placeholder="Ex : Licence 2" onChange={handleChange} style={styles.input} />
            </Field>
            <div style={{ gridColumn: 'span 2' }}>
              <Field label="Profession / Activité">
                <input name="profession" placeholder="Ex : Étudiant(e), Commerçant(e)..." onChange={handleChange} style={styles.input} />
              </Field>
            </div>
          </div>

          {/* Section Motivation */}
          <SectionLabel>Engagement</SectionLabel>
          <Field label="Pourquoi souhaitez-vous rejoindre la Mairie des Jeunes ?" style={{ marginBottom: '1.5rem' }}>
            <textarea name="motivation" placeholder="Décrivez votre motivation en quelques lignes..." onChange={handleChange} style={{ ...styles.input, height: 88, resize: 'none' }} />
          </Field>

          {/* Domaines */}
          <SectionLabel>Domaines d'intérêt</SectionLabel>
          <div style={styles.checkboxGrid}>
            {DOMAINES.map(dom => {
              const checked = formData.domaines.includes(dom);
              return (
                <label
                  key={dom}
                  onClick={() => toggleDomaine(dom)}
                  style={{ ...styles.cbLabel, ...(checked ? styles.cbLabelChecked : {}) }}
                >
                  <span style={{ ...styles.cbBox, ...(checked ? styles.cbBoxChecked : {}) }}>
                    {checked && <span style={styles.cbCheck}>✓</span>}
                  </span>
                  {dom}
                </label>
              );
            })}
          </div>

          {/* Bénévolat */}
          <SectionLabel>Expérience bénévole</SectionLabel>
          <div style={styles.radioRow}>
            <span style={styles.radioQuestion}>Avez-vous déjà fait du bénévolat ?</span>
            <div style={styles.radios}>
              {['Oui', 'Non'].map(val => {
                const checked = formData.experienceBenevole === val;
                return (
                  <label
                    key={val}
                    onClick={() => setFormData(prev => ({ ...prev, experienceBenevole: val }))}
                    style={styles.radioLabel}
                  >
                    <span style={{ ...styles.radioDot, ...(checked ? styles.radioDotChecked : {}) }}>
                      {checked && <span style={styles.radioInner} />}
                    </span>
                    <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: 13 }}>{val}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Submit */}
          <button type="submit" disabled={isSubmitting} style={{ ...styles.btn, ...(isSubmitting ? styles.btnDisabled : {}) }}>
            {isSubmitting ? (
              <>
                <Spinner />
                <span>Envoi en cours...</span>
              </>
            ) : (
              <>
                <span>Soumettre ma candidature</span>
                <span>→</span>
              </>
            )}
          </button>
        </form>

        <p style={styles.footer}>Mairie des Jeunes de Parakou · Vos données sont traitées avec confidentialité</p>
      </div>
    </div>
  );
}

/* ── Small helpers ── */

function SectionLabel({ children }) {
  return (
    <div style={styles.sectionLabel}>
      {children}
      <span style={styles.sectionLine} />
    </div>
  );
}

function Field({ label, children, style }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      <label style={styles.fieldLabel}>{label}</label>
      {children}
    </div>
  );
}

function Spinner() {
  return (
    <span style={{
      width: 18, height: 18, borderRadius: '50%',
      border: '2px solid rgba(11,29,58,0.3)',
      borderTopColor: '#0B1D3A',
      display: 'inline-block',
      animation: 'mjp-spin 0.7s linear infinite'
    }} />
  );
}

/* ── Styles ── */

const styles = {
  wrap: {
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    background: '#0B1D3A',
    minHeight: '100vh',
    padding: '2rem 1rem 3rem',
    position: 'relative',
    overflow: 'hidden',
  },
  glowTop: {
    position: 'absolute', top: -120, right: -120,
    width: 420, height: 420, borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  glowBottom: {
    position: 'absolute', bottom: -80, left: -80,
    width: 300, height: 300, borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  card: {
    maxWidth: 660,
    margin: '0 auto',
    position: 'relative',
    zIndex: 1,
  },
  header: { textAlign: 'center', marginBottom: '2rem' },
  badge: {
    display: 'inline-block',
    background: 'rgba(212,175,55,0.15)',
    border: '1px solid rgba(212,175,55,0.4)',
    color: '#D4AF37',
    fontSize: 11, fontWeight: 500, letterSpacing: 2,
    textTransform: 'uppercase',
    padding: '6px 18px', borderRadius: 100,
    marginBottom: '1rem',
  },
  title: {
    fontSize: 28, fontWeight: 700, color: '#fff',
    lineHeight: 1.2, marginBottom: '0.5rem',
    fontFamily: 'Georgia, serif',
  },
  titleGold: { color: '#D4AF37' },
  subtitle: {
    fontSize: 13, color: 'rgba(255,255,255,0.45)',
    fontWeight: 300, letterSpacing: '0.5px',
  },
  divider: {
    width: 48, height: 2,
    background: 'linear-gradient(90deg, #D4AF37, transparent)',
    margin: '1rem auto 0',
  },
  form: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 20,
    padding: '2rem',
  },
  sectionLabel: {
    fontSize: 10, fontWeight: 500,
    letterSpacing: 2, textTransform: 'uppercase',
    color: '#D4AF37', marginBottom: '1rem',
    display: 'flex', alignItems: 'center', gap: 10,
  },
  sectionLine: {
    flex: 1, height: 1,
    background: 'rgba(212,175,55,0.2)',
  },
  grid2: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 14, marginBottom: '1.5rem',
  },
  fieldLabel: {
    fontSize: 11, color: 'rgba(255,255,255,0.45)',
    fontWeight: 400, letterSpacing: '0.5px',
  },
  input: {
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 10, padding: '11px 14px',
    fontSize: 14, color: '#fff',
    outline: 'none', width: '100%',
    fontFamily: 'inherit',
    appearance: 'none',
  },
  checkboxGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 10, marginBottom: '1.5rem',
  },
  cbLabel: {
    display: 'flex', alignItems: 'center', gap: 9,
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 10, padding: '10px 12px',
    cursor: 'pointer', fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    userSelect: 'none',
    transition: 'all 0.18s',
  },
  cbLabelChecked: {
    border: '1px solid rgba(212,175,55,0.5)',
    background: 'rgba(212,175,55,0.08)',
    color: '#fff',
  },
  cbBox: {
    width: 16, height: 16, minWidth: 16,
    border: '1.5px solid rgba(255,255,255,0.25)',
    borderRadius: 5,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  cbBoxChecked: { background: '#D4AF37', border: '1.5px solid #D4AF37' },
  cbCheck: { fontSize: 10, color: '#0B1D3A', fontWeight: 700 },
  radioRow: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 10, padding: '14px 16px',
    marginBottom: '1.5rem',
  },
  radioQuestion: { fontSize: 13, color: 'rgba(255,255,255,0.65)' },
  radios: { display: 'flex', gap: 20 },
  radioLabel: {
    display: 'flex', alignItems: 'center', gap: 8,
    cursor: 'pointer', userSelect: 'none',
  },
  radioDot: {
    width: 18, height: 18, borderRadius: '50%',
    border: '1.5px solid rgba(255,255,255,0.3)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  radioDotChecked: {
    border: '1.5px solid #D4AF37',
    background: 'rgba(212,175,55,0.15)',
  },
  radioInner: {
    width: 8, height: 8, borderRadius: '50%',
    background: '#D4AF37',
  },
  btn: {
    width: '100%', padding: 15, borderRadius: 12, border: 'none',
    cursor: 'pointer', fontFamily: 'inherit', fontSize: 15, fontWeight: 500,
    background: 'linear-gradient(135deg, #D4AF37 0%, #B8960C 100%)',
    color: '#0B1D3A', letterSpacing: '0.5px',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
  },
  btnDisabled: { opacity: 0.5, cursor: 'not-allowed' },
  footer: {
    textAlign: 'center', marginTop: '1rem',
    fontSize: 11, color: 'rgba(255,255,255,0.25)',
  },
};
