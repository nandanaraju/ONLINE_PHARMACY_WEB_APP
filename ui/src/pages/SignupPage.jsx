import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignupPage = () => {
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("user"); 
    const navigate = useNavigate();

    const signupSubmit = async (userDetails) => {
        const res = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userDetails),
        });

        if (res.ok) {
            toast.success("Signup success");
            navigate("/login");
        } else {
            toast.error("Please check the input data");
        }
    };

    const submitForm = (e) => {
        e.preventDefault();
        const userDetails = {
            username,
            password,
            email,
            userType,
        };

        signupSubmit(userDetails);
    };

    return (
        <div className="flex items-center justify-center h-screen bg-teal-50">
            <div className="bg-white shadow-lg rounded-lg flex max-w-4xl w-full">
                <div className="w-1/2 bg-teal-100 p-8 flex flex-col justify-center items-center rounded-l-lg">
                    <h2 className="text-2xl font-bold text-gray-700 mb-4">Welcome Back!</h2>
                    <p className="text-gray-600 mb-8 text-center">
                        To keep connected with us, please login with your personal info
                    </p>
                    <Link to="/login">
                        <button className="bg-teal-500 text-white px-6 py-2 rounded hover:bg-teal-600">
                            Sign In
                        </button>
                    </Link>
                </div>

                <div className="w-1/2 bg-white p-8 flex flex-col justify-center rounded-r-lg">
                    <h2 className="text-3xl font-bold text-teal-600 mb-8 text-center">Create Account</h2>
                    <form onSubmit={submitForm}>
                        <div className="mb-4">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Name"
                                value={username}
                                onChange={(e) => setUserName(e.target.value)}
                                className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>
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
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
