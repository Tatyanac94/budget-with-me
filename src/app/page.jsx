"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { registerUser, login } from "../utils/useAuth";

const HomePage = () => {
  const router = useRouter();
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Create a ref for the login section
  const loginSectionRef = useRef(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setShowSuccessMessage(false); // Hide success message on new registration attempt

    try {
      await registerUser(registerEmail, registerPassword);
      setRegistrationSuccess(true);
      setShowSuccessMessage(true);

      // Show success message for 2 seconds then scroll to login section
      setTimeout(() => {
        setShowSuccessMessage(false);
        // Scroll to the login section
        if (loginSectionRef.current) {
          loginSectionRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 2000); // 2 seconds delay for the message to be visible

    } catch (error) {
      setError(error.message || "Error registering user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(loginEmail, loginPassword);
      router.push("/management");
    } catch (error) {
      setError(error.message || "Error logging in. Please check your credentials and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container bg-gray-800 text-white p-4">
      <header className="text-center">
        <h1 className="text-3xl font-bold">Welcome to Budget With Me</h1>
        <p>Track your expenses to manage your budget effectively.</p>
      </header>

      <section className="registration-section mt-8 border border-gray-700 rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4">Sign Up</h2>
        <h2 className="text-lg">Get Started Today</h2>
        <p className="mb-4">Sign up now to start tracking your expenses and managing your budget.</p>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Name"
            value={registerName}
            onChange={(e) => setRegisterName(e.target.value)}
            required
            className="border border-gray-700 rounded-lg p-2 block mb-4 w-full text-black"
          />
          <input
            type="email"
            placeholder="Email"
            value={registerEmail}
            onChange={(e) => setRegisterEmail(e.target.value)}
            required
            className="border border-gray-700 rounded-lg p-2 block mb-4 w-full text-black"
          />
          <input
            type="password"
            placeholder="Password"
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
            required
            className="border border-gray-700 rounded-lg p-2 block mb-4 w-full text-black"
          />
          <div className="flex justify-center">
          <button
            type="submit"
            className={`bg-gray-700 text-white rounded-lg px-4 py-2 block ${loading ? "bg-gray-600 cursor-not-allowed" : "hover:bg-gray-600"}`}
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
          </div>
        </form>
        {showSuccessMessage && (
          <p className="text-green-400">You have successfully signed up!</p>
        )}
        {error && (
          <p className="text-red-400">{error}</p>
        )}
      </section>

      <br className="my-8" />

      <section
        className="login-section border border-gray-700 rounded-lg p-4"
        ref={loginSectionRef} // Attach the ref to the login section
      >
        <h2 className="text-xl font-bold mb-4">Sign In</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            required
            className="border border-gray-700 rounded-lg p-2 block mb-4 w-full text-black"
          />
          <input
            type="password"
            placeholder="Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            required
            className="border border-gray-700 rounded-lg p-2 block mb-4 w-full text-black"
          />
          <div className="flex justify-center">
          <button
            type="submit"
            className={`bg-gray-700 text-white rounded-lg px-4 py-2 block ${loading ? "bg-gray-600 cursor-not-allowed" : "hover:bg-gray-600"}`}
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
          </div>
        </form>
        {error && (
          <p className="text-red-400">{error}</p>
        )}
      </section>

      <br className="my-8" />

      <section className="benefits-section text-center">
        <h2 className="text-xl font-bold">Why Use an Expense Tracker?</h2>
        <ul className="list-disc list-inside mt-4">
          <li>Monitor spending habits</li>
          <li>Improved Financial Awareness</li>
          <li>Understand where your money goes</li>
          <li>Plan for future expenses</li>
          <li>Enhanced Financial Control</li>
          <li>Stress Reduction</li>
          <li>Financial Planning</li>
        </ul>
      </section>

    </div>
  );
};

export default HomePage;
