import { db } from './firebase.config';
import { collection, getDocs } from 'firebase/firestore';

// Function to fetch expense sheets
export const fetchExpenseSheets = async () => {
  const expenseSheetsRef = collection(db, 'users', 'user1@example.com', 'expenseSheets');
  const snapshot = await getDocs(expenseSheetsRef);
  const expenseSheets = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return expenseSheets;
};
