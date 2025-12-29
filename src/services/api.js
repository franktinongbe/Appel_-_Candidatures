import axios from 'axios';

const API_URL = "https://candidatures-one.vercel.app"; 

const api = axios.create({
  baseURL: API_URL,
  // ⚠️ On ne force pas le Content-Type ici pour laisser 
  // le navigateur gérer le "boundary" du FormData lors de l'envoi de fichiers.
  withCredentials: true
});

export const candidatEndpoints = {
  // ✅ Envoyer une candidature (Gère les fichiers via FormData)
  postuler: (formData) => api.post('/api/candidats/postuler', formData, {
    headers: {
      // Axios détectera automatiquement le type multipart si vous passez un FormData
      'Content-Type': 'multipart/form-data'
    }
  }),

  // Récupérer tous les candidats (Admin)
  getAll: () => api.get('/api/candidats/liste-privee'),

  // Récupérer un candidat par son ID
  getById: (id) => api.get(`/api/candidats/${id}`),

  // Supprimer une candidature
  delete: (id) => api.delete(`/api/candidats/${id}`)
};

export default api;