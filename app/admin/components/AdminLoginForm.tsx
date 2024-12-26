import { useState } from "react";
import Link from "next/link";

export const AdminLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation (example)
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    // Simulate a login process (replace this with actual logic)
    console.log("Logging in with", email, password);

    // If login fails
    // setError("Invalid credentials"); // Uncomment this line if login fails

    // Clear error on successful login
    setError("");
  };

  return (
    <div className="flex flex-col items-center p-6 space-y-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-6">

        <h2 className="text-2xl font-semibold text-dark-600">Admin Login</h2>
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md mt-6 hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>

      <div className="mt-4 text-sm text-center">
        <p className="text-gray-600">
          Forgot your password?{" "}
          <Link href="/admin/forgot-password" className="text-blue-700 hover:underline font-medium">
            Reset it
          </Link>
        </p>
      </div>

      <div className="mt-6 text-center">
        <Link href="/" className="text-blue-600 hover:underline">
          Back to Doctor Portal
        </Link>
      </div>
    </div>
  );
};
