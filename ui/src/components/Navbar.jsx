import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
const Navbar = () => {
    const [userType, setUserType] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getUserType = () => {
            const authToken = document.cookie
                .split('; ')
                .find(row => row.startsWith('Authtoken'))
                ?.split('=')[1];
            if (authToken) {
                const decoded = jwtDecode(authToken);
                return decoded.userType;
            }
            return null;
        };

        setUserType(getUserType());
    }, []);

    const handleLogout = async () => {
        await fetch('/api/logout', {
            method: 'GET',
            credentials: 'include',
        });
        setUserType(null);
        navigate('/');
    };

    return (
        <nav className="bg-teal-500 p-3 sticky top-0">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white font-bold text-xl ml-10">
                    Carewell Pharmacy
                </div>
                <ul className="flex space-x-8">
                    <li><Link to="/" className="text-white font-bold text-large hover:text-opacity-75">Home</Link></li>
                    <li><Link to="/products" className="text-white font-bold text-large hover:text-opacity-75">Products</Link></li>
                    {userType === 'admin' && (
                        <li><Link to="/add-product" className=" text-white font-bold text-large hover:text-opacity-75">Add Product</Link></li>
                    )}
                    <li><Link to="/contact.html" className="text-white font-bold text-large hover:text-opacity-75">Contact Us</Link></li>
                </ul>
                <div>
                    {userType ? (
                        <button onClick={handleLogout} className="bg-white text-teal-500 font-bold text-sm px-5 py-3 rounded-full">
                            Logout
                        </button>
                    ) : (
                        <Link to="/login" className="bg-white text-teal-500 font-bold text-sm px-5 py-3 rounded-full">Login</Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;