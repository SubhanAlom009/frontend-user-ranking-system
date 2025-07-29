import { FaCrown } from "react-icons/fa";

export default function Leaderboard({ leaderboardData = [] }) {
  const rankStyles = [
    "bg-yellow-300 text-yellow-900",
    "bg-gray-300 text-gray-900",
    "bg-orange-300 text-orange-900",
  ];

  return (
    <div className="p-4 bg-gradient-to-b from-yellow-100 via-white to-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">🏆 Top Performers</h2>
      <div className="flex justify-center gap-4 items-end mb-4">
        {leaderboardData.slice(0, 3).map((user, index) => (
          <div
            key={user._id}
            className={`flex flex-col items-center p-3 rounded-xl shadow-md w-24 ${
              rankStyles[index]
            } ${index === 1 ? "mt-4" : index === 2 ? "mt-8" : "mt-0"}`}
          >
            <FaCrown className="text-xl mb-1" />
            <div className="font-bold text-lg">{user.name}</div>
            <div className="text-xs font-medium">{user.totalPoints} pts</div>
            <div className="text-sm font-bold mt-1">#{index + 1}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
