import axios from 'axios';

// 1. Configuration de base
// On s'assure qu'il n'y a pas de slash à la fin
const API_URL = "https://candidatures-one.vercel.app"; 

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

// 2. Définition des Endpoints
export const candidatEndpoints = {
  // Envoyer une nouvelle candidature
  postuler: (data) => api.post('/api/candidats/postuler', data),

  // Récupérer tous les candidats (si tu as une interface admin)
  getAll: () => api.get('/api/candidats'),

  // Récupérer un candidat par son ID
  getById: (id) => api.get(`/api/candidats/${id}`),

  // Supprimer une candidature
  delete: (id) => api.delete(`/api/candidats/${id}`)
};

export default api;