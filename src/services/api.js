import axios from "axios";

const API = axios.create({
  baseURL: "https://backend-user-ranking-system.onrender.com/api", // baseURL now includes /api
});

// ========== USERS ==========

export const getUsers = () => API.get("/users");
export const addUser = (userData) => API.post("/users", userData);
export const getUserById = (userId) => API.get(`/users/${userId}`);

// ========== CLAIMS ==========

export const getLeaderboard = () => API.get("/claims/leaderboard");
export const claimPoints = (userId) => API.post(`/claims/${userId}`);
