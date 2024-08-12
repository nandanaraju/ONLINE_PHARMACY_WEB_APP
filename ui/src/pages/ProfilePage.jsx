import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';
import { toast } from 'react-toastify';

const ProfilePage = () => {
    const [user, setUser] = useState({});
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch('/api/profile', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch profile');
                }

                const data = await response.json();
                setUser(data.user);
            } catch (err) {
                console.error('Error fetching profile:', err);
                setError('Failed to load profile');
                toast.error('An error occurred while fetching profile data');
            }
        };

        fetchProfile();
    }, []);

    return (
        <>
        <Navbar/>
            
            <div className="min-h-screen bg-cover bg-center flex items-center justify-center"
                style={{ backgroundImage: "url('https://img.freepik.com/free-photo/clipboard-with-pills-copy-space_23-2148551018.jpg?t=st=1723350442~exp=1723354042~hmac=b3eb54acca52abd2e2cde52bba106a74fc4791bd41477598bcb87954f100949a&w=1060')" }}>
            <main className="container mx-auto mt-2 p-4 ">
                <section className="rounded-lg   p-8">
                    <div className="flex items-center justify-center ">
                        <h2 className="text-3xl font-bold text-gray-800">My Profile</h2>
                    </div>
                    <div className="flex space-x-8">
                        <div className="w-1/2 p-6 rounded-lg ">
                            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Order History</h3>
                            {user.cart && user.cart.length > 0 ? (
                                user.cart.map((item, index) => (
                                    <div key={index} className="mb-4">
                                        <p className="text-lg"><strong>Product ID:</strong> {item.productId || 'N/A'}</p>
                                        <p className="text-lg"><strong>Quantity:</strong> {item.quantity || 'N/A'}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No orders found</p>
                            )}
                        </div>
                        <div className="w-1/2 pl-64 rounded-lg">
                            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Personal Details</h3>
                            <p className="text-lg mb-2"><strong>Name:</strong> {user.username || 'N/A'}</p>
                            <p className="text-lg mb-2"><strong>Email:</strong> {user.email || 'N/A'}</p>
                        </div>
                    </div>
                    <div className="flex justify-center mt-16">
                        <Link to="/products" className="bg-teal-500 text-white px-6 py-3 rounded-full shadow hover:bg-teal-600 ">Continue Shopping</Link>
                    </div>
                </section>
            </main>
            </div>
            <Footer />
        </>
    );
};

export default ProfilePage;
