import axios from 'axios';

axios.defaults.timeout = 60000;
axios.defaults.baseURL = process.env.API_HOST;

// 请求拦截器配置
axios.interceptors.request.use(set => {
  const token = window.localStorage.getItem('token');

  set.headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };

  return set;
}, err => {
  return Promise.reject(err);
});

/**
 * post请求
 */
function doPost(url, params = {}){
  return axios.post(url, params);
}

/**
 * get请求
 */
function doGet(url, params = {}){
  return axios.get(url, {params: params});
}

export default {
  doPost,
  doGet,
}




