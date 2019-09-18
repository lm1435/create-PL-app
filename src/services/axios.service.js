import axios from 'axios';

const axiosGet = (url) => axios.get(url);

const axiosGetWithDataObj = (url, data) => axios.get(url, { data });

const axiosPost = (url, params) => axios.post(url, params);

const axiosAll = function () { return axios.all([...arguments]) };

const axiosSpread = (data) => axios.spread(data);

export {
  axiosGet,
  axiosGetWithDataObj,
  axiosPost,
  axiosAll,
  axiosSpread,
};
