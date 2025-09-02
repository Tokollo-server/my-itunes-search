import axios from "axios";

const API_URL = "http://localhost:5000/api";

let token = null;

// Get token from backend
async function getToken() {
  if (!token) {
    const res = await axios.get(`${API_URL}/token`);
    token = res.data.token;
  }
  return token;
}

// Search function
async function search(term, media) {
  const t = await getToken();
  const res = await axios.get(`${API_URL}/search`, {
    params: { term, media },
    headers: { Authorization: `Bearer ${t}` },
  });
  return res.data;
}

//  Wrap in an object before exporting
const api = {
  search,
};

export default api;
