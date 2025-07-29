import { useEffect, useState } from "react";
import Leaderboard from "./components/Leaderboard";
import UserList from "./components/UserList";
import AddUser from "./components/AddUserForm";
import { getLeaderboard } from "./services/api";
import { useSocket } from "./contexts/SocketContext";
import { Toaster } from "react-hot-toast";

export default function App() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const socket = useSocket();

  const fetchLeaderboard = async () => {
    try {
      const res = await getLeaderboard();
      setLeaderboardData(res.data);
    } catch (err) {
      console.error("Failed to fetch leaderboard:", err);
    }
  };

  useEffect(() => {
    fetchLeaderboard(); // initial load
  }, []);

  useEffect(() => {
    if (!socket) return;

    // Listen for real-time events
    socket.on("user-added", () => {
      fetchLeaderboard();
    });
    socket.on("points-claimed", () => {
      fetchLeaderboard();
    });

    return () => {
      socket.off("user-added");
      socket.off("points-claimed");
    };
  }, [socket]);

  return (
    <main className="p-4 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 gap-6 mt-8">
        <Leaderboard leaderboardData={leaderboardData} />
        <UserList onPointsClaimed={fetchLeaderboard} />
        <AddUser onUserAdded={fetchLeaderboard} />
      </div>
      <Toaster />
    </main>
  );
}
