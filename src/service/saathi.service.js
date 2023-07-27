// import accessToken from "../helpers/jwt-token-access/accessToken";
import axios from "axios";
//pass new generated access token here
// const token = accessToken
const token =
  "WyIyIiwiJDUkcm91bmRzPTUzNTAwMCRSSE1wOERQM25HU1c5UjRnJHdPZTdmcW02SmtDckc3TVp3U25yOXQwYUdoNzBSb3BOUHZwZldWU052bTgiXQ.YzWIjA.n7mu5dMCUjmqVlNvmfmYQfjcfmU";


const baseUrl = "https://api-prod.agrani.io/";



const axiosApi = axios.create({
  baseURL: baseUrl,
});

axiosApi.defaults.headers.common["Authorization"] = token;

axiosApi.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);
export const SaathiService = {
  // Master data
  getBulkData,
  getOccupationData,
  getMasterstateData,
  getMasterdistrictsData,
  getMasterblocksData,
  getMastervillagesData,
  getMBankwithifsc,
  getMasterBankData,
  getMasterBranchesData,
  updateFarmer,
  
 
};

// Master Data Call  Mathed
export async function getBulkData(config = {}) {
  return await axiosApi
    .get(`master/bulk`, { ...config })
    .then((response) => response.data);
}
// Master Data Call  Mathed
export async function getOccupationData(config = {}) {
  return await axiosApi
    .get(`enrolment/occupation`, { ...config })
    .then((response) => response.data);
}
// Master Data Call  Mathed
export async function getMasterstateData(config = {}) {
  return await axiosApi
    .get(`/master/states`, { ...config })
    .then((response) => response.data);
}
// Master Districts Data Call  Mathed
export async function getMasterdistrictsData(did, config = {}) {
  return await axiosApi
    .get(`/master/states/${did}/districts`, { ...config })
    .then((response) => response.data);
}
// Master Blocks Data Call  Mathed
export async function getMasterblocksData(blockid, config = {}) {
  return await axiosApi
    .get(`/master/districts/${blockid}/blocks`, { ...config })
    .then((response) => response.data);
}

// Master Blocks Data Call  Mathed
export async function getMastervillagesData(vid, config = {}) {
  return await axiosApi
    .get(`/master/blocks/${vid}/villages`, { ...config })
    .then((response) => response.data);
}


// Master Bank Data Call Mathed
export async function getMBankwithifsc(Ifsccode, config = {}) {
  return await axiosApi
    .get(`/master/bank_master/${Ifsccode}`, { ...config })
    .then((response) => response.data);
}

export async function getMasterBankData(config = {}) {
  return await axiosApi
    .get(`/master/banks`, { ...config })
    .then((response) => response.data);
}
// Master Bank Data Call Mathed
export async function getMasterBranchesData(bankid, config = {}) {
  return await axiosApi
    .get(`/master/bank/branches?id=${bankid}`, { ...config })
    .then((response) => response.data);
}
//Farmer Detail call api
export async function updateFarmer(id, params, config = {}) {
  return axiosApi
    .put(`/enrolment/farmers?id=${id}`, { ...params }, { ...config })
    .then((response) => response.data);
}
