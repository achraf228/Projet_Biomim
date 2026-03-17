import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("biomim_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res.data,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("biomim_token");
      localStorage.removeItem("biomim_user");
      window.location.href = "/admin/connexion";
    }
    return Promise.reject(err);
  }
);

export default api;

// Auth API

export const authApi = {
  register: (data) => api.post('/users/register/', data),
  login: (data) => api.post('/users/login/', data),
  logout: () => api.post('/users/logout/'),
  me: () => api.get('/users/me/'),
  updateProfile: (data) => api.patch('/users/profile/update/', data),
  changePassword: (data) => api.post('/users/change-password/', data),
  generateApiKey: () => api.get('/users/api-key/generate/'),
}

// Plants API

export const plantsApi = {
  list: (params) => api.get('/plants/', { params }),
  detail: (slug) => api.get(`/plants/${slug}/`),
  featured: () => api.get('/plants/featured/'),
  endangered: () => api.get('/plants/endangered/'),
  map: () => api.get('/plants/map/'),
  stats: () => api.get('/plants/stats/'),
  families: () => api.get('/plants/families/'),
  regions: () => api.get('/plants/regions/'),
  addComment: (plantId, data) => api.post(`/plants/${plantId}/comment/`, data),
  chat: (data) => api.post('/plants/chat/ask/', data),
}

// Subscriptions API

export const subscriptionsApi = {
  plans: () => api.get('/subscriptions/plans/'),
  mySubscriptions: () => api.get('/subscriptions/my/'),
  initiatePayment: (data) => api.post('/subscriptions/initiate/', data),
  verifyPayment: (reference) => api.get(`/subscriptions/verify/${reference}/`),
  mockConfirm: (data) => api.post('/subscriptions/mock/confirm/', data),
}