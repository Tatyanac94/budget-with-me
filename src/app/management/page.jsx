//management/page.jsx
"use client"
import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase.config'; // Adjust the path based on your actual folder structure and file names
import { collection, doc, setDoc, getDocs, deleteDoc } from 'firebase/firestore';
import useAuth from '../../utils/useAuth'; // Adjust the path based on your actual folder structure
import ExpenseSheetForm from '../../components/expenseSheetForm'; // Adjusted import path
import ExpenseSheetList from '../../components/expenseSheetList'; // Adjusted import path
import LoadingSpinner from '../../components/loadingSpinner'; // Adjusted import path


const ManagementPage = () => {
  const { user } = useAuth();
  const [expenseSheets, setExpenseSheets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const fetchExpenseSheets = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, 'users', user.email, 'expenseSheets'));
          const sheets = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setExpenseSheets(sheets);
        } catch (error) {
          console.error('Error fetching expense sheets: ', error);
        } finally {
          setLoading(false);
        }
      };

      fetchExpenseSheets();
    }
  }, [user]);

  const handleCreateExpenseSheet = async (newSheetData) => {
    try {
      const newSheetRef = await setDoc(doc(collection(db, 'users', user.email, 'expenseSheets')), newSheetData);
      setExpenseSheets(prevSheets => [...prevSheets, { id: newSheetRef.id, ...newSheetData }]);
    } catch (error) {
      console.error('Error creating expense sheet: ', error);
    }
  };

  const handleDeleteExpenseSheet = async (sheetId) => {
    try {
      await deleteDoc(doc(db, 'users', user.email, 'expenseSheets', sheetId));
      setExpenseSheets(prevSheets => prevSheets.filter(sheet => sheet.id !== sheetId));
    } catch (error) {
      console.error('Error deleting expense sheet: ', error);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <h2>Expense Management</h2>
      <ExpenseSheetForm onCreate={handleCreateExpenseSheet} />
      <ExpenseSheetList sheets={expenseSheets} onDelete={handleDeleteExpenseSheet} />
    </div>
  );
};

export default ManagementPage;
