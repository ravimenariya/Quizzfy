import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../controllers/userHandler";

// A generic Icon component for reuse
const Icon = ({ path, className = "w-6 h-6" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
);

const SignupPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: "John Doe",
        email: "temp@mail.com",
        password: "12345678",
        confirmPassword: "12345678",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (
            !formData.fullName ||
            !formData.email ||
            !formData.password ||
            !formData.confirmPassword
        ) {
            setError("Please fill out all fields.");
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        if (formData.password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }
        setLoading(true);
        console.log("Form data:", formData);
        // --- API call would go here ---
        try {
            const response = await registerUser(formData);
            
            if (response.success) {
                navigate("/login");
            } else {
                setError(response.message);
            }
        }
        catch (error) {
            setError(error.message);
        }
        setLoading(false);
    };

    // Base styles for reuse
    const labelStyles =
        "block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300";
    const inputStyles =
        "w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100";

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-block p-3 bg-indigo-100 dark:bg-indigo-900/40 rounded-full mb-4">
                            <Icon
                                path="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                                className="w-8 h-8 text-indigo-600 dark:text-indigo-400"
                            />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                            Create Your Account
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-2">
                            Join Quizzfy and start creating.
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} noValidate>
                        {error && (
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-500/30 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg mb-6 text-sm">
                                {error}
                            </div>
                        )}
                        <div className="space-y-6">
                            <div>
                                <label
                                    htmlFor="fullName"
                                    className={labelStyles}
                                >
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    className={inputStyles}
                                    placeholder="John Doe"
                                    
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className={labelStyles}>
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={inputStyles}
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className={labelStyles}
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className={inputStyles}
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="confirmPassword"
                                    className={labelStyles}
                                >
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    className={inputStyles}
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="mt-8">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading
                                    ? "Creating Account..."
                                    : "Create Account"}
                            </button>
                        </div>
                    </form>

                    {/* Footer */}
                    <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-8">
                        Already have an account?{" "}
                        <button
                            type="button"
                            onClick={() => navigate("/login")}
                            className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                        >
                            Log in
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
