import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { toast } from 'react-toastify';

const ProfilePage = () => {
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await fetch('http://localhost:5000/profile', {
                    headers: {
                        'Authorization': `Bearer ${document.cookie.split('=')[1]}`, 
                    },
                });

                if (res.ok) {
                    const { user } = await res.json();
                    setUser(user);
                } else {
                    toast.error('Failed to fetch user data');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                toast.error('An error occurred while fetching user data');
            }
        };

        fetchUserData();
    }, []);

    return (
        <>
            <nav className="bg-teal-500 p-3 sticky top-0">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="text-white font-bold text-xl ml-10">
                        Carewell Pharmacy
                    </div>
                    <ul className="flex space-x-8">
                        <li><Link to="/" className="text-white font-bold text-large hover:text-opacity-75">Home</Link></li>
                        <li><Link to="/products" className="text-white font-bold text-large hover:text-opacity-75">Products</Link></li>
                        <li><Link to="/contact" className="text-white font-bold text-large hover:text-opacity-75">Contact Us</Link></li>
                    </ul>
                    <div>
                        <Link to="/" className="bg-white text-teal-500 font-bold text-sm px-5 py-3 rounded-full">Logout</Link>
                    </div>
                </div>
            </nav>
            <main className="container mx-auto mt-2 p-4">
                <section className="rounded-lg shadow-lg p-8">
                    <div className="flex items-center justify-center mb-8">
                        <img src="../images/imgA.png" alt="Profile" className="size-12 mr-2"/>
                        <h2 className="text-3xl font-bold text-gray-800">My Profile</h2>
                    </div>
                    <div className="flex space-x-8">
                        <div className="w-1/2 p-6 rounded-lg">
                            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Order History</h3>
                            {/* Order History details */}
                        </div>
                        <div className="w-1/2 pl-64 rounded-lg">
                            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Personal Details</h3>
                            <p className="text-lg mb-2"><strong>Name:</strong> {user.username || 'N/A'}</p>
                            <p className="text-lg mb-2"><strong>Email:</strong> {user.email || 'N/A'}</p>
                        </div>
                    </div>
                    <div className="flex justify-center mt-8">
                        <Link to="/products" className="bg-teal-500 text-white px-6 py-3 rounded shadow hover:bg-teal-600">Continue Shopping</Link>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default ProfilePage;
