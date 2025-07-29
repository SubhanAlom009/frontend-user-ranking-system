import { useState } from "react";
import toast from "react-hot-toast";
import { addUser } from "../services/api";

export default function AddUserForm({ onUserAdded }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Name is required.");
      return;
    }

    try {
      setLoading(true);
      const res = await addUser({ name });
      toast.success("User added successfully!");
      setName("");
      if (onUserAdded) onUserAdded(res.data);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to add user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto space-y-3">
      <input
        type="text"
        placeholder="Enter user name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-black"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-black text-white text-sm py-2 rounded hover:bg-opacity-90 transition"
      >
        {loading ? "Adding..." : "Add User"}
      </button>
    </form>
  );
}
