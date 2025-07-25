
import axios from "axios";
const host = import.meta.env.VITE_HOST_BACKEND
const port = import.meta.env.VITE_PORT_BACKEND


const api = axios.create({
    baseURL: `http://${host}:${port}/api/v1`    
})

// Agregar el token dinámicamente antes de cada solicitud
api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
);

// Valida la respuesta recibida para determinar si el token es invalido o ha expirado
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Verifica que NO estés ya en login
      if (window.location.pathname !== '/login') {
        console.error("Token inválido o expirado");
        localStorage.clear();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;