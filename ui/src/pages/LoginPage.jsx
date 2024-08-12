import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [adminPassphrase, setAdminPassphrase] = useState("");
    const [userType, setUserType] = useState("user");
    const navigate = useNavigate();

    const loginSubmit = async (e) => {
        e.preventDefault();

        const loginDetails = { username, password };
        if (userType === "admin") {
            loginDetails.adminPassphrase = adminPassphrase;
        }

        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginDetails),
            });

            if (res.ok) {
                const data = await res.json();
                toast.success(`Logged in as: ${data.userType}`);
                
                // Navigate based on userType
                if (data.userType === "admin") {
                    navigate("/admin");
                } else {
                    navigate("/profile");
                }
            } else {
                toast.error("Please check your credentials");
            }
        } catch (error) {
            toast.error("Login failed. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-teal-50">
            <div className="bg-white shadow-lg rounded-lg flex max-w-4xl w-full">
                <div className="w-1/2 bg-teal-100 p-8 flex flex-col justify-center items-center rounded-l-lg">
                    <h2 className="text-2xl font-bold text-gray-700 mb-4">New Here?</h2>
                    <p className="text-gray-600 mb-8 text-center">
                        Sign up and discover great opportunities
                    </p>
                    <Link to="/sign-up">
                        <button className="bg-teal-500 text-white px-6 py-2 rounded hover:bg-teal-600">
                            Sign Up
                        </button>
                    </Link>
                </div>

                <div className="w-1/2 bg-white p-8 flex flex-col justify-center rounded-r-lg">
                    <h2 className="text-3xl font-bold text-teal-600 mb-8 text-center">Login</h2>
                    <form onSubmit={loginSubmit}>
                        <div className="mb-4">
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Username"
                                className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Password"
                                className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {userType === "admin" && (
                            <div className="mb-4">
                                <input
                                    type="password"
                                    id="adminPassphrase"
                                    name="adminPassphrase"
                                    placeholder="Admin Passphrase"
                                    className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    value={adminPassphrase}
                                    onChange={(e) => setAdminPassphrase(e.target.value)}
                                />
                            </div>
                        )}

                        <div className="mb-4">
                            <select
                                id="userType"
                                name="userType"
                                className="border rounded w-full py-2 px-3"
                                required
                                value={userType}
                                onChange={(e) => setUserType(e.target.value)}
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>

                        <div className="flex items-center justify-between mb-6">
                            <button
                                type="submit"
                                className="bg-teal-500 text-white px-6 py-2 rounded hover:bg-teal-600 w-full"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
