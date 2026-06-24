import axios from "axios";

const BASE_URL = "https://codeforces.com/api";

export const getUserInfo = async (handle) => {
  const response = await axios.get(
    `${BASE_URL}/user.info?handles=${handle}`
  );
  return response.data.result[0];
};

export const getRatingHistory = async (handle) => {
  const response = await axios.get(
    `${BASE_URL}/user.rating?handle=${handle}`
  );
  return response.data.result;
};

export const getSubmissions = async (handle) => {
  const response = await axios.get(
    `${BASE_URL}/user.status?handle=${handle}&count=10000`
  );
  return response.data.result;
};