import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const loginSubmit = async (e) => {
        e.preventDefault();
        const loginDetails = {
            username,
            password,
        };

        const res = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginDetails),
        });
        console.log(res, "login res from /login");
        if (res.ok) {
            // console.log('/login resp json', data)
            const data = await res.json();
            const userType = data.userType;
            // console.log('userType ', userType)
            toast.success(`Logged in as : ${userType}`);
            return navigate("/profile");
        } else {
            toast.error(`Please check your credentials`);
            return navigate("/login");
        }
    };

    return (
        <div className="bg-teal-50 flex items-center justify-center h-screen">
            <div className="bg-white p-10 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-3xl font-bold text-teal-600 mb-4 text-center">
                    Login
                </h2>
                <form onSubmit={loginSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="username"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            Username:
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
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
                            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-between mb-6">
                        <button
                            type="submit"
                            className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
                        >
                            Login
                        </button>
                    </div>
                    <p className="text-center">
                        Don't have an account?{" "}
                        <Link to="/sign-up" className="text-teal-700 hover:underline">
                            Sign Up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

const getUserType = () => {
    const authToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("Authtoken"))
        ?.split("=")[1];
    console.log("document.cookie value", authToken);

    const decoded = jwtDecode(authToken);
    console.log("decoded", decoded);
    const userType = decoded.userType;
    console.log("userType", userType);
    return userType;
};

export { LoginPage as default, getUserType };
