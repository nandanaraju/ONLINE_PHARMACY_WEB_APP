import React from 'react';
import { Link } from 'react-router-dom';

const AdminPage = () => {
    return (
        <div className="min-h-screen bg-gray-100 py-10 text-center">
            <div className="max-w-7xl mx-auto p-8 bg-white shadow-md rounded-lg">
                <h1 className="text-3xl font-bold text-teal-800 mb-8 text-center">Admin Dashboard</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Link
                        to="/pres"
                        className="bg-teal-500 text-white p-6 rounded-lg shadow hover:bg-teal-600 transition"
                    >
                        <div className="text-4xl font-bold"></div>
                        <div className="text-xl mt-2">Orders</div>
                        <div className="mt-4 text-sm">More info ➜</div>
                    </Link>

                    <Link
                        to="/products"
                        className="bg-teal-500 text-white p-6 rounded-lg shadow hover:bg-teal-600 transition"
                    >
                        <div className="text-4xl font-bold"></div>
                        <div className="text-xl mt-2">Products</div>
                        <div className="mt-4 text-sm">More info ➜</div>
                    </Link>

                    <Link
                        to="/message"
                        className="bg-teal-500 text-white p-6 rounded-lg shadow hover:bg-teal-600 transition"
                    >
                        <div className="text-4xl font-bold"></div>
                        <div className="text-xl mt-2">Messages</div>
                        <div className="mt-4 text-sm">More info ➜</div>
                    </Link>


                    <Link
                        to="/add-product"
                        className="bg-teal-500 text-white p-6 rounded-lg shadow hover:bg-teal-600 transition"
                    >
                        <div className="text-xl mt-2">Add Product</div>
                        <div className="mt-4 text-sm"> ➜</div>

                    </Link>
                </div>








            </div>
        </div>

    );
};

export default AdminPage;
