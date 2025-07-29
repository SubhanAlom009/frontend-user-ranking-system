import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`, // baseURL now includes /api
});

// ========== USERS ==========

export const getUsers = () => API.get("/api/users");
export const addUser = (userData) => API.post("/api/users", userData);
export const getUserById = (userId) => API.get(`/api/users/${userId}`);

// ========== CLAIMS ==========

export const getLeaderboard = () => API.get("/api/claims/leaderboard");
export const claimPoints = (userId) => API.post(`/api/claims/${userId}`);
