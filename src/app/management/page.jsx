"use client";

import React, { useState, useEffect } from "react";
import ExpenseItemFormComponent from "@/components/expenseItemForm";
import { Item, Expenses } from "@/utils/expenses";
import { auth, db } from "../../../firebase.config"; 
import AddAuthItemForm from "@/components/addAuthExpenseItemForm";
import LogoutButton from "@/components/logoutButton";
import { getAllDocuments, addDocument, deleteDocument, updateDocument } from "@/utils/firebaseUtils"; 
import Spinner from "@/components/spinner"; 

export default function ManagementPage() {
  const [expenses, setExpenses] = useState(new Expenses("Budget With Me: Expense Tracker", []));
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(""); 

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUserId(user.uid);
        setLoading(false); 
      } else {
        setUserId(null);
        setLoading(false); 
      }
    });

  //   return () => unsubscribe(); 
  // }, []);






    // Check if unsubscribe is a function before returning
    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);





  useEffect(() => {
    async function fetchData() {
      if (userId) {
        try {
          const documents = await getAllDocuments(db, "items");
          const userItems = documents.filter(doc => doc.userId === userId);
          const items = userItems.map(doc => new Item(doc.name, doc.amount, doc.id));
          setExpenses(new Expenses(expenses.name, items));
        } catch (error) {
          console.error("Error fetching data:", error);
          if (error.code === 'quota-exceeded') {
            setError("The application has exceeded its Firebase quota. Please try again later.");
          } else {
            setError("An error occurred while fetching data. Please try again later.");
          }
        }
      }
    }

    if (!loading && userId) {
      fetchData();
    }
  }, [userId, loading, expenses]);

  const handleAddItem = async (newItem) => {
    if (userId) {
      try {
        const item = new Item(newItem.name, newItem.amount);
        await addDocument(db, "items", {
          name: item.name,
          amount: item.amount,
          userId: userId
        });
        setExpenses(prevExpenses => ({
          ...prevExpenses,
          items: [...prevExpenses.items, item]
        }));
        console.log("Added item successfully");
      } catch (error) {
        console.error("Error adding item:", error);
      }
    } else {
      console.log("User not authenticated. Cannot add item.");
    }
  };

  const handleUpdateItem = async (updatedItem) => {
    if (userId) {
      try {
        await updateDocument(db, "items", updatedItem.id, {
          name: updatedItem.name,
          amount: updatedItem.amount,
          userId: userId
        });
        setExpenses(prevExpenses => ({
          ...prevExpenses,
          items: prevExpenses.items.map(item =>
            item.id === updatedItem.id ? updatedItem : item
          )
        }));
        console.log("Updated item successfully");
      } catch (error) {
        console.error("Error updating item:", error);
      }
    } else {
      console.log("User not authenticated. Cannot update item.");
    }
  };

  const handleDeleteItem = async (id) => {
    if (userId) {
      try {
        await deleteDocument(db, "items", id);
        setExpenses(prevExpenses => ({
          ...prevExpenses,
          items: prevExpenses.items.filter(item => item.id !== id)
        }));
        console.log("Deleted item successfully");
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    } else {
      console.log("User not authenticated. Cannot delete item.");
    }
  };

  // Function to calculate total expenses
  const calculateTotalExpenses = () => {
    return expenses.items.reduce((total, item) => total + parseFloat(item.amount), 0);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <main className="p-8">
      <div className="mb-4 text-center">
        <LogoutButton />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {userId ? (
        <div>
          <h1 className="text-2xl font-bold mb-4 underline">Track Your Expenses</h1>
          <AddAuthItemForm handleAddItem={handleAddItem} userId={userId} />
          <div>
            <h2 className="text-xl font-bold mb-2 divide-y divide-gray-200 underline">Expenses:</h2>
            {expenses.items.length === 0 ? (
              <p>No expenses available</p>
            ) : (
              <div className="space-y-4">
                {expenses.items.map((item) => (
                  <ExpenseItemFormComponent
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    amount={item.amount}
                    updateItem={handleUpdateItem}
                    deleteItem={handleDeleteItem}
                    isManagementPage={true}
                  />
                ))}
              </div>
            )}
            <br />
            <div className="text-xl font-bold">
              Total Expenses: ${calculateTotalExpenses().toFixed(2)}
            </div>
            <br />
          </div>
        </div>
      ) : (
        <div>
          <h1 className="text-2xl font-bold">You are not logged in.</h1>
          <p>Please log in to access the expense tracking features.</p>
        </div>
      )}
    </main>
  );
}
