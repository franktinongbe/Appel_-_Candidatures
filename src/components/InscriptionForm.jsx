import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function InscriptionForm() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nomPrenoms: '', age: '', sexe: '', whatsapp: '', quartier: '',
    profession: '', niveauEtude: '', motivation: '', domaines: [],
    experienceBenevole: '', pretAContribuer: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      const updatedDomaines = checked 
        ? [...formData.domaines, value]
        : formData.domaines.filter(d => d !== value);
      setFormData(prev => ({ ...prev, domaines: updatedDomaines }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation simple du numéro WhatsApp (format béninois 8 chiffres)
    const phoneRegex = /^[0-9]{8}$/;
    if (!phoneRegex.test(formData.whatsapp.replace(/\s/g, ''))) {
      alert("Veuillez entrer un numéro WhatsApp valide de 8 chiffres.");
      return;
    }

    setIsSubmitting(true);

    // Simulation d'envoi (vous pourrez remplacer par un fetch vers votre API)
    console.log("Données d'adhésion :", formData);
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Redirection vers le groupe WhatsApp
    window.location.href = "https://chat.whatsapp.com/Czznaibnrdc8PXnkXrYS1R";
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-xl rounded-2xl my-10 border border-gray-100">
      <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">
        FORMULAIRE D’ADHÉSION <br/> 
        <span className="text-lg text-gray-600 font-medium">MAIRIE DES JEUNES DE PARAKOU</span>
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="nomPrenoms" placeholder="Nom et Prénoms" onChange={handleChange} className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none" required />
          <input type="number" name="age" placeholder="Âge" onChange={handleChange} className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none" required />
          <select name="sexe" onChange={handleChange} className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none" required>
            <option value="">Sexe</option>
            <option value="M">Masculin</option>
            <option value="F">Féminin</option>
          </select>
          <input type="text" name="whatsapp" placeholder="WhatsApp (ex: 97000000)" onChange={handleChange} className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none" required />
        </div>

        <input type="text" name="quartier" placeholder="Quartier / Arrondissement" onChange={handleChange} className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="profession" placeholder="Profession / Activité" onChange={handleChange} className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none" />
          <input type="text" name="niveauEtude" placeholder="Niveau d'étude" onChange={handleChange} className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none" />
        </div>

        <textarea name="motivation" placeholder="Pourquoi souhaitez-vous rejoindre la Mairie des Jeunes ?" onChange={handleChange} className="border p-3 rounded-lg w-full h-24 focus:ring-2 focus:ring-blue-500 outline-none"></textarea>

        <div className="p-4 bg-gray-50 rounded-xl">
          <p className="font-semibold mb-3 text-sm text-gray-700">Dans quel domaine souhaitez-vous vous engager ?</p>
          <div className="grid grid-cols-2 gap-3 text-sm">
            {['Communication', 'Numérique', 'Événementiel', 'Environnement', 'Entrepreneuriat', 'Sport'].map(dom => (
              <label key={dom} className="flex items-center space-x-2 cursor-pointer hover:text-blue-600">
                <input type="checkbox" value={dom} onChange={handleChange} className="w-4 h-4" /> 
                <span>{dom}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl text-sm">
          <span className="font-semibold text-gray-700">Déjà bénévole ?</span>
          <div className="space-x-4">
            <label><input type="radio" name="experienceBenevole" value="Oui" onChange={handleChange} required /> Oui</label>
            <label><input type="radio" name="experienceBenevole" value="Non" onChange={handleChange} /> Non</label>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className={`w-full font-bold py-4 rounded-xl transition-all shadow-md ${
            isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
              Envoi en cours...
            </span>
          ) : "Soumettre ma candidature"}
        </button>
      </form>
    </div>
  );
}
