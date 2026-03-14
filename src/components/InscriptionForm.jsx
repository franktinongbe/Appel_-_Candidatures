import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function InscriptionForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nomPrenoms: '',
    age: '',
    sexe: '',
    whatsapp: '',
    quartier: '',
    profession: '',
    niveauEtude: '',
    motivation: '',
    domaines: [],
    experienceBenevole: '',
    pretAContribuer: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      const updatedDomaines = checked 
        ? [...formData.domaines, value]
        : formData.domaines.filter(d => d !== value);
      setFormData({ ...formData, domaines: updatedDomaines });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Données d'adhésion :", formData);
    // Ici, ajoutez votre logique d'envoi (API, Firebase, etc.)
    alert("Candidature envoyée avec succès !");
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg my-10">
      <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
        FORMULAIRE D’ADHÉSION <br/> 
        <span className="text-xl text-gray-700">ASSOCIATION MAIRIE DES JEUNES DE PARAKOU</span>
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="nomPrenoms" placeholder="Nom et Prénoms" onChange={handleChange} className="border p-2 rounded w-full" required />
          <input type="number" name="age" placeholder="Âge" onChange={handleChange} className="border p-2 rounded w-full" required />
          <select name="sexe" onChange={handleChange} className="border p-2 rounded w-full" required>
            <option value="">Sexe</option>
            <option value="M">Masculin</option>
            <option value="F">Féminin</option>
          </select>
          <input type="text" name="whatsapp" placeholder="Téléphone / WhatsApp" onChange={handleChange} className="border p-2 rounded w-full" required />
        </div>

        <input type="text" name="quartier" placeholder="Quartier / Arrondissement" onChange={handleChange} className="border p-2 rounded w-full" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="profession" placeholder="Profession / Activité" onChange={handleChange} className="border p-2 rounded w-full" />
          <input type="text" name="niveauEtude" placeholder="Niveau d'étude" onChange={handleChange} className="border p-2 rounded w-full" />
        </div>

        <textarea name="motivation" placeholder="Pourquoi souhaitez-vous rejoindre la Mairie des Jeunes ?" onChange={handleChange} className="border p-2 rounded w-full h-24"></textarea>

        <div className="p-3 bg-gray-50 rounded">
          <p className="font-semibold mb-2 text-sm">Dans quel domaine souhaitez-vous vous engager ?</p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {['Communication', 'Numérique', 'Événementiel', 'Environnement', 'Entrepreneuriat', 'Sport'].map(dom => (
              <label key={dom} className="flex items-center space-x-2">
                <input type="checkbox" value={dom} onChange={handleChange} /> <span>{dom}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center text-sm py-2">
          <span>Déjà bénévole ?</span>
          <label><input type="radio" name="experienceBenevole" value="Oui" onChange={handleChange} /> Oui</label>
          <label><input type="radio" name="experienceBenevole" value="Non" onChange={handleChange} /> Non</label>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded hover:bg-blue-700 transition">
          Soumettre ma candidature
        </button>
      </form>
    </div>
  );
}
