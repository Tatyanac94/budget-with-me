import React, { useState } from "react";
import { registerUser } from "@/utils/useAuth";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await registerUser(email, password);
      // Optionally redirect or show success message
      setEmail("");
      setPassword("");
      // Example: redirect to login page or home page
      // window.location.href = "/login";
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="items-center justify-center py-8 bg-black text-white">
      <p className="py-4 text-2xl font-bold text-center text-blue-600">
        Please Register or Login to start managing your library
      </p>
      <div className="w-full max-w-md p-8 mx-auto space-y-8 bg-white rounded shadow-lg">
        <h2 className="text-2xl font-bold text-center text-blue-600">
          Register
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-4 mb-4 text-sm text-red-600 bg-red-100 rounded">
              {error}
            </div>
          )}
          <div>
            <label
              htmlFor="register-email"
              className="block text-sm font-medium "
            >
              Email
            </label>
            <input
              id="register-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="register-password"
              className="block text-sm font-medium "
            >
              Password
            </label>
            <input
              id="register-password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <button
              type="submit"
              className={`w-full px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
