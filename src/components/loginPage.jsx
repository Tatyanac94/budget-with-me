import React, { useState } from "react";
import { login } from "@/utils/useAuth";
import { useRouter } from "next/router"; // Assuming you use Next.js for routing

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Hook for routing

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      await login(email, password);
      // Optionally navigate to another page
      router.push("/home"); // Redirect to home page or dashboard
      setEmail("");
      setPassword("");
    } catch (err) {
      setError("Login failed. Please check your email and password.");
      console.error("Error logging in:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-lg">
        <h2 className="text-2xl font-bold text-center ">
          Login
        </h2>
        <form id="login-page" onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-4 mb-4 text-sm text-red-600 bg-red-100 rounded">
              {error}
            </div>
          )}
          <div>
            <label
              htmlFor="login-email"
              className="block text-sm font-medium"
            >
              Email
            </label>
            <input
              id="login-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none sm:text-sm text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="login-password"
              className="block text-sm font-medium"
            >
              Password
            </label>
            <input
              id="login-password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none sm:text-sm text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <button
              type="submit"
              className={`w-full px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-gray-600 hover:bg-gray-700"} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
