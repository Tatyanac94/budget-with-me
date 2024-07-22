// utils/expenses.js
import { db } from '../../firebase.config';
import { collection, getDocs } from 'firebase/firestore';

export const fetchExpenseSheets = async (userId) => {
  const querySnapshot = await getDocs(collection(db, 'users', userId, 'expenseSheets'));
  const sheets = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return sheets;
};
