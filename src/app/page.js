// pages/index.js

import Head from 'next/head';
import { useEffect, useState } from 'react';
import { fetchExpenseSheets } from '../firebaseService';

const Home = () => {
  const [expenseSheets, setExpenseSheets] = useState([]);

  useEffect(() => {
    const fetchExpenseData = async () => {
      const data = await fetchExpenseSheets();
      setExpenseSheets(data);
    };
    fetchExpenseData();
  }, []);

  return (
    <div>
      <Head>
        <title>Expense Tracker</title>
        <meta name="description" content="Expense Tracker App using Next.js and Firestore" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Expense Tracker</h1>
        <div>
          <h2>Expense Sheets</h2>
          <ul>
            {expenseSheets.map(sheet => (
              <li key={sheet.id}>
                <h3>{sheet.title}</h3>
                <p>{sheet.description}</p>
                <p>Budget: ${sheet.budget}</p>
                {/* Render other details like income, categories, goals */}
              </li>
            ))}
          </ul>
        </div>
      </main>

      <footer>
        {/* Footer content if needed */}
      </footer>
    </div>
  );
};

export default Home;
