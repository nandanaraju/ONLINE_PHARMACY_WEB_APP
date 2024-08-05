import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignupPage = () => {
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("admin");
    const navigate = useNavigate();

    // signup
    const signupSubmit = async (userDetails) => {
        const res = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userDetails),
        });
        // return;
        console.log(res);
        if (res.ok) {
            toast.success(`Signup success`);
            return navigate("/login");
        } else {
            toast.error(`Please check the input data`);
            return navigate("/sign-up");
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
        <div className="bg-teal-50 flex items-center justify-center h-screen">
            <div className="bg-white p-10 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-3xl font-bold text-teal-500 mb-4 text-center">
                    Sign Up
                </h2>
                <form onSubmit={submitForm}>
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            Name:
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="type"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            Role
                        </label>
                        <select
                            id="userType"
                            name="userType"
                            className="border rounded w-full py-2 px-3"
                            required
                            value={userType}
                            onChange={(e) => setUserType(e.target.value)}
                        >
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                    </div>
                    <div className="flex items-center justify-between mb-6">
                        <button
                            type="submit"
                            className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
                        >
                            Sign Up
                        </button>
                    </div>
                    <p className="text-center">
                        Already have an account?{" "}
                        <Link to="/login" className="text-teal-700 hover:underline">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;
