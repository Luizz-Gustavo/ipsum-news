import axios from 'axios';

const Api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

//Interceptor para lidar com respostas de erro globalmente
Api.interceptors.response.use(
  response => response,
  error => {
    // if (error.response && error.response.status === 401) {
    //   // Lógica para lidar com erros de autenticação, por exemplo:
    //   // Redirecionar para a página de login
    //   window.location.href = '/login';
    // }
    return Promise.reject(error);
  }
);

export default Api;