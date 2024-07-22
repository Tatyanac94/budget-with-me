"use client"
// pages/index.jsx

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../firebase.config";

const HomePage = () => {
  const router = useRouter();
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await auth.createUserWithEmailAndPassword(registerEmail, registerPassword);
      setRegistrationSuccess(true);
    } catch (error) {
      console.error('Error registering user: ', error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(loginEmail, loginPassword);
      router.push("/management");
    } catch (error) {
      console.error("Error signing in: ", error);
    }
  };

  return (
    <div className="home-container bg-gray-800 text-white p-4">
      <header>
        <h1 className="text-3xl font-bold">Welcome to Budget With Me</h1>
        <p>Track your expenses and manage your budget effectively.</p>
      </header>

      <section className="registration-section mt-8 border border-gray-700 rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4">Sign Up</h2>
        <h2 className="text-lg">Get Started Today</h2>
        <p className="mb-4">Sign up now to start tracking your expenses and managing your budget.</p>
        <form onSubmit={handleRegister}>
          <input type="text" placeholder="Name" value={registerName} onChange={(e) => setRegisterName(e.target.value)} required className="border border-gray-700 rounded-lg p-2 block mb-4 w-full" />
          <input type="email" placeholder="Email" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} required className="border border-gray-700 rounded-lg p-2 block mb-4 w-full" />
          <input type="password" placeholder="Password" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} required className="border border-gray-700 rounded-lg p-2 block mb-4 w-full" />
          <button type="submit" className="bg-gray-700 text-white rounded-lg px-4 py-2 block hover:bg-gray-600">Sign Up</button>
        </form>
        {registrationSuccess && (
          <p>Welcome! You are signed up. Please sign in.</p>
        )}
      </section>

      <br className="my-8" />

      <section className="login-section border border-gray-700 rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4">Sign In</h2>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} className="border border-gray-700 rounded-lg p-2 block mb-4 w-full" />
          <input type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className="border border-gray-700 rounded-lg p-2 block mb-4 w-full" />
          <button type="submit" className="bg-gray-700 text-white rounded-lg px-4 py-2 block hover:bg-gray-600">Sign In</button>
        </form>
      </section>

      <br className="my-8" />

      <section className="benefits-section">
        <h2 className="text-xl font-bold">Why Use an Expense Tracker?</h2>
        <ul className="list-disc list-inside mt-4">
          <li>Monitor spending habits</li>
          <li>Set and achieve financial goals</li>
          <li>Understand where your money goes</li>
          <li>Plan for future expenses</li>
        </ul>
      </section>

      <br className="my-8" />

      <section className="offer-section">
        <h2 className="text-xl font-bold">What We Offer</h2>
        <ul className="list-disc list-inside mt-4">
          <li>Easy-to-use expense tracking interface</li>
          <li>Personalized budget management tools</li>
          <li>Insightful reports and analytics</li>
          <li>Secure data storage with Firebase</li>
        </ul>
      </section>
    </div>
  );
};

export default HomePage;
