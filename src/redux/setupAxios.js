export default function setupAxios(axios, store) {
  axios.interceptors.request.use(
    config => {
      const {
        auth: { user }
      } = store.getState();
      if (user && user.authToken) {
        config.headers.Authorization = `Bearer ${user.authToken}`;
      }

      return config;
    },
    err =>{
      return Promise.reject(err)
    } 
  );
}
