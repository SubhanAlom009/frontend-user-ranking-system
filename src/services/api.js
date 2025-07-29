import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api", // change if deployed
});

// ========== USERS ==========

export const getUsers = () => API.get("/users");
export const getLeaderboard = () => API.get("/claims/leaderboard");

export const claimPoints = (userId) => API.post(`/claims/${userId}`);

export const addUser = (userData) => API.post("/users", userData);

// (Optional) get specific user by id
export const getUserById = (userId) => API.get(`/users/${userId}`);
