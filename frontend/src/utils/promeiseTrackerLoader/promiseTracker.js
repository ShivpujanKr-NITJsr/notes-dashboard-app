import axios from 'axios';

let activeRequests = 0;
let setGlobalLoading = null;

export const setGlobalLoadingHandler = (fn) => {
  setGlobalLoading = fn;
};

// Attaching interceptors
export const attachInterceptors = () => {
  axios.interceptors.request.use((config) => {
    activeRequests++;
    setGlobalLoading?.(true);
    return config;
  });

  axios.interceptors.response.use(
    (response) => {
      activeRequests--;
      if (activeRequests === 0) setGlobalLoading?.(false);
      return response;
    },
    (error) => {
      activeRequests--;
      if (activeRequests === 0) setGlobalLoading?.(false);
      return Promise.reject(error);
    }
  );
};
