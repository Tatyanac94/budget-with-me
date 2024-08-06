import React, { useState } from "react";

export default function AddAuthItemForm({ handleAddItem, userId }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Extract data from the form
      const formData = new FormData(event.target);
      const newItem = {
        name: formData.get("name"),
        amount: parseInt(formData.get("amount"), 10),
        userId, // Add userId to the new item
      };

      // Validate amount
      if (isNaN(newItem.amount) || newItem.amount <= 0) {
        throw new Error("Amount must be a positive number.");
      }

      // Call the handleAddItem function with the new item data
      await handleAddItem(newItem); // Assuming handleAddItem is async

      // Optionally, clear the form fields
      event.target.reset();
    } catch (err) {
      setError(err.message || "Failed to add item. Please try again.");
      console.error("Error adding item:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-5 m-5 border border-gray-700 rounded-lg bg-gray-800 text-white">
      <h2 className="text-xl font-bold mb-4">Add an Expense Item</h2>
      {error && (
        <div className="p-4 mb-4 text-sm text-red-400 bg-red-100 rounded">
          {error}
        </div>
      )}
      <div className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Name"
          name="name"
          id="name-input"
          required
          className="p-2 border border-gray-700 rounded-lg bg-white text-gray-900"
        />
        <input
          type="number"
          placeholder="Amount"
          name="amount"
          min={0}
          required
          className="p-2 border border-gray-700 rounded-lg bg-white text-gray-900"
        />
        <button
          type="submit"
          className={`p-2 rounded-lg border border-gray-700 ${loading ? "bg-gray-600 cursor-not-allowed" : "bg-gray-700 hover:bg-gray-600"} text-white`}
          disabled={loading}
        >
          {loading ? "Adding..." : "Submit"}
        </button>
      </div>
    </form>
  );
}
