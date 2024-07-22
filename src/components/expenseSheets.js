// ExpenseSheets.js
import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, doc, setDoc, getDocs, deleteDoc } from "firebase/firestore";
import useAuth from "../useAuth";

const ExpenseSheets = () => {
  const { user } = useAuth();
  const [expenseSheets, setExpenseSheets] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState(0);
  // Add more state variables as needed for income, categories, and goals

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        const querySnapshot = await getDocs(collection(db, "users", user.email, "expenseSheets"));
        const sheets = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setExpenseSheets(sheets);
      };
      fetchData();
    }
  }, [user]);

  const handleCreateSheet = async () => {
    try {
      const newSheetRef = doc(collection(db, "users", user.email, "expenseSheets"));
      await setDoc(newSheetRef, {
        title,
        description,
        budget,
        // Add other fields here
      });
      setTitle("");
      setDescription("");
      setBudget(0);
      // Reset other state variables
    } catch (error) {
      console.error("Error creating sheet: ", error);
    }
  };

  const handleDeleteSheet = async (sheetId) => {
    try {
      await deleteDoc(doc(db, "users", user.email, "expenseSheets", sheetId));
      setExpenseSheets(expenseSheets.filter((sheet) => sheet.id !== sheetId));
    } catch (error) {
      console.error("Error deleting sheet: ", error);
    }
  };

  return (
    <div>
      <h2>Expense Sheets</h2>
      <div>
        <h3>Create New Sheet</h3>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input type="number" placeholder="Budget" value={budget} onChange={(e) => setBudget(e.target.value)} />
        <button onClick={handleCreateSheet}>Create</button>
      </div>
      <ul>
        {expenseSheets.map((sheet) => (
          <li key={sheet.id}>
            <h3>{sheet.title}</h3>
            <p>{sheet.description}</p>
            <p>Budget: ${sheet.budget}</p>
            <button onClick={() => handleDeleteSheet(sheet.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseSheets;
