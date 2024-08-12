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
        <div className='bg-teal-50'>
        <nav className="text-teal-600 p-3 sticky top-0 z-50 ">
    <div className=" bg-teal-50 container mx-auto flex justify-between items-center">
        <div className=" font-bold text-2xl ml-4 md:ml-10">
            Carewell Pharmacy
        </div>
        <ul className="flex space-x-4 md:space-x-8 mr-4 ">
            <li><Link to="/" className=" font-bold text-sm md:text-lg hover:text-opacity-75 hover:underline hover:decoration-green-600">Home</Link></li>
            <li><Link to="/products" className=" font-bold text-sm md:text-lg hover:text-opacity-75 hover:underline hover:decoration-green-600">Products</Link></li>
            <li><Link to="/about" className=" font-bold text-sm md:text-lg hover:underline hover:decoration-green-600">About Us</Link></li>
            {userType === 'admin' && (
                <li><Link to="/admin" className=" font-bold text-sm md:text-lg hover:text-opacity-75 hover:underline hover:decoration-green-600">Dashboard</Link></li>
            )}
            {userType === 'user' && (
                <li><Link to="/contact" className=" font-bold text-sm md:text-lg hover:text-opacity-75 hover:underline hover:decoration-green-600">Contact Us</Link></li>
            )}
        </ul>
        <div className="mr-4 md:mr-10">
            {userType ? (
                <button onClick={handleLogout} className="bg-white text-sm text-teal-500 font-bold text-sm px-4 py-2 md:px-5 md:py-3 rounded-full hover:bg-gray-100 hover:text-teal-600">
                    Logout
                </button>
            ) : (
                <Link to="/login" className="bg-teal-500 text-white text-sm font-bold text-sm px-4 py-2 md:px-5 md:py-3 rounded-full hover:bg-gray-100 hover:text-teal-600">Login</Link>
            )}
        </div>
    </div>
</nav>
</div>

    );
};

export default Navbar;