import React, { useState } from "react";
import { Item } from "@/utils/expenses";

export default function ExpenseItemFormComponent({
  id,
  name,
  amount,
  updateItem,
  deleteItem,
  isManagementPage,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedItem, setUpdatedItem] = useState({
    name,
    amount,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdateItem = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const newItem = new Item(updatedItem.name, updatedItem.amount);
      newItem.id = id;

      await updateItem(newItem); 
      setIsEditing(false);
    } catch (err) {
      setError("Failed to update item. Please try again.");
      console.error("Error updating item:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = async () => {
    setLoading(true);
    setError("");

    try {
      await deleteItem(id); 
    } catch (err) {
      setError("Failed to delete item. Please try again.");
      console.error("Error deleting item:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col p-5 m-5 border border-gray-700 rounded-lg bg-gray-800 text-white">
      {error && (
        <div className="p-4 mb-4 text-sm text-red-400 bg-red-100 rounded">
          {error}
        </div>
      )}
      {isEditing ? (
        <form onSubmit={handleUpdateItem} className="flex flex-col space-y-4">
          <input
            name="name"
            id="name-input"
            required
            type="text"
            value={updatedItem.name}
            onChange={(e) => setUpdatedItem({ ...updatedItem, name: e.target.value })}
            className="p-2 border border-gray-700 rounded-lg bg-white text-gray-900"
            placeholder="Name"
          />
          <input
            name="amount"
            id="amount-input"
            required
            type="number"
            value={updatedItem.amount}
            onChange={(e) => setUpdatedItem({ ...updatedItem, amount: parseInt(e.target.value) || 0 })}
            className="p-2 border border-gray-700 rounded-lg bg-white text-gray-900"
            placeholder="Amount"
            min={0}
          />
          <button
            type="submit"
            className={`p-2 rounded-lg border border-gray-700 ${loading ? "bg-gray-600 cursor-not-allowed" : "bg-green-700 hover:bg-green-600"} text-white`}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      ) : (
        <div className="flex justify-between">
          <div>
            <p className="my-1">
              <span className="font-bold underline">Name:</span> {name}
            </p>
            <p className="my-1">
              <span className="font-bold underline">Amount:</span> {amount}
            </p>
          </div>
          {isManagementPage && (
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 rounded-lg border border-gray-700 bg-yellow-600 hover:bg-yellow-500 text-white font-bold"
              >
                Edit
              </button>
              <button
                onClick={handleDeleteItem}
                className={`p-2 rounded-lg border border-gray-700 ${loading ? "bg-gray-600 cursor-not-allowed" : "bg-red-600 hover:bg-red-500"} text-white font-bold`}
                disabled={loading}
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
