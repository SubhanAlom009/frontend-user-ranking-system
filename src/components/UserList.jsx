import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useSocket } from "../contexts/SocketContext";
import { getUsers } from "../services/api";

export default function UserList({ onPointsClaimed }) {
  const [users, setUsers] = useState([]);
  const [loadingUserId, setLoadingUserId] = useState(null);
  const socket = useSocket();

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      // Sort users in descending order by totalPoints
      const sorted = [...res.data].sort(
        (a, b) => b.totalPoints - a.totalPoints
      );
      setUsers(sorted);
    } catch (err) {
      toast.error("Failed to load users.", err);
    }
  };

  const handleSendPoints = async (userId, userName) => {
    try {
      setLoadingUserId(userId);
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/claims/${userId}`
      );
      const { claimedPoints } = res.data;

      toast.success(`🎉 ${claimedPoints} points awarded to ${userName}!`);
      await fetchUsers(); // Refresh user list
      if (onPointsClaimed) onPointsClaimed(); // Refresh leaderboard
    } catch (err) {
      toast.error("Failed to send points.", err);
    } finally {
      setLoadingUserId(null);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (!socket) return;
    // Show toast for all real-time point claims
    const handlePointsClaimed = (data) => {
      toast.success(`🎉 ${data.claimedPoints} points awarded to ${data.name}!`);
      fetchUsers();
    };
    const handleUserAdded = () => fetchUsers();

    socket.on("points-claimed", handlePointsClaimed);
    socket.on("user-added", handleUserAdded);

    return () => {
      socket.off("points-claimed", handlePointsClaimed);
      socket.off("user-added", handleUserAdded);
    };
  }, [socket]);

  return (
    <div className="p-4 mt-8 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">🎯 All Users</h2>
      <div className="space-y-2">
        {users.map((user) => (
          <div
            key={user._id}
            className="flex justify-between items-center p-2 bg-gray-50 rounded shadow-sm"
          >
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-gray-600">{user.totalPoints} pts</p>
            </div>
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 disabled:opacity-50"
              onClick={() => handleSendPoints(user._id, user.name)}
              disabled={loadingUserId === user._id}
            >
              {loadingUserId === user._id ? "Sending..." : "Send Points"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
