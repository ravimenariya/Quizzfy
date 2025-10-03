import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../controllers/userHandler";
import { useAppContext } from "../context/appContext"

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

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAppContext();
    const [formData, setFormData] = useState({
        email: "dravon@example.com",
        password: "password123",
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
        if (!formData.email || !formData.password) {
            setError("Please fill out all fields.");
            return;
        }
        setLoading(true);

        const response = await loginUser(formData);
        if (!response.success) setError(response.message);
        else {
            const { token, userData } = response;
            login(userData,token);
            navigate("/");
        }
        setLoading(false);
    };
    return (
        <div className="flex justify-center p-12">
            <div className="bg-white dark:bg-gray-800 max-w-[450px] w-full min-h-[80vh]  rounded-xl shadow-lg p-8">
                <div className="Header bg-gren-500  mb-4 bg-geen-500 flex flex-col items-center">
                    <span className="bg-gray-200 dark:bg-indigo-900 p-3 mb-4 rounded-full">
                        <Icon
                            path="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            className="w-8 h-8 text-indigo-600 dark:text-indigo-400"
                        />
                    </span>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Welcome Back !
                    </h1>
                    <p className="text-md my-2 text-gray-600 dark:text-white">
                        Sign in to continue to Quizzfy
                    </p>
                </div>
                {/* signup form here */}
                <div className="  bg-rd-500">
                    <form onSubmit={handleSubmit}>
                        <div className="flex my-4 flex-col justify-center">
                            <label
                                className="text-md font-semibold font- text-gray-600 mb-2  dark:text-white"
                                htmlFor="email"
                            >
                                Email Address *
                            </label>
                            <input
                                className="bg-gray-100 border-2  rounded-2xl px-6 py-2  focus:outline-none  focus:border-indigo-500 transition-colors dark:bg-gray-700 dark:border-gray-600 dark:focus:border-indigo-500  dark:text-gray-100"
                                type="text"
                                placeholder="you@example.com"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="flex my-4 my-6 flex-col justify-center">
                            <div className="flex justify-between">
                                <label
                                    className="text-md font-semibold font- text-gray-600 mb-2  dark:text-white"
                                    htmlFor="password"
                                >
                                    Password *
                                </label>
                                <a
                                    href="#"
                                    className="text-md font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-300 dark:hover:text-indigo-300"
                                >
                                    Forgot password?
                                </a>
                            </div>
                            <input
                                className="bg-gray-100 border-2  rounded-2xl px-6 py-2  focus:outline-none  focus:border-indigo-500 transition-colors dark:bg-gray-700 dark:border-gray-600 dark:focus:border-indigo-500  dark:text-gray-100"
                                type="password"
                                placeholder="• • • • • • • •"
                                name="password"
                                required
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                        </div>
                        {error && (
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-500/30 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg mb-6 text-sm">
                                {error}
                            </div>
                        )}
                        <button disabled={loading} className="p-3 w-full rounded-lg text-white font-semibold hover:bg-indigo-500  bg-indigo-600">
                            {loading
                                ? "logging..."
                                : "Login"}
                        </button>
                    </form>
                </div>
                {/* sign up go */}
                <div className="mt-8 flex justify-center">
                    <p className="text-gray-800 font-semibold dark:text-white">
                        Don't have an Account ?
                        <a
                            onClick={() => navigate("/signup")}
                            className="text-indigo-500 dark:text-indigo-300 cursor-pointer"
                        >
                            {" "}
                            Sign up
                        </a>{" "}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
