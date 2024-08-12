import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AdminPresPage = () => {
    const [checkouts, setCheckouts] = useState([]);

    useEffect(() => {
        const fetchCheckouts = async () => {
            try {
                const response = await fetch('api/admin/checkouts');
                const data = await response.json();
                setCheckouts(data);
            } catch (error) {
                console.error('Error fetching checkouts:', error);
            }
        };

        fetchCheckouts();
    }, []);

    const handleConfirmOrder = async (id) => {
        try {
            const response = await fetch(`api/admin/checkouts/${id}/confirm`, {
                method: 'PUT',
            });

            if (response.ok) {
                setCheckouts(checkouts.map((checkout) =>
                    checkout._id === id ? { ...checkout, confirmedByAdmin: true, status: 'Confirmed' } : checkout
                ));
            } else {
                console.error('Error confirming order');
            }
        } catch (error) {
            console.error('Error confirming order:', error);
        }
    };

    const handleRejectOrder = async (id) => {
        try {
            const response = await fetch(`api/admin/checkouts/${id}/reject`, {
                method: 'PUT',
            });

            if (response.ok) {
                setCheckouts(checkouts.map((checkout) =>
                    checkout._id === id ? { ...checkout, confirmedByAdmin: false, status: 'Cancelled' } : checkout
                ));
            } else {
                console.error('Error rejecting order');
            }
        } catch (error) {
            console.error('Error rejecting order:', error);
        }
    };

    return (
        <>

            <div className="container mx-auto mt-8">
                <h2 className="text-4xl mb-4 font-bold text-teal-600 text-center">Uploaded Orders</h2>
                <ul>
                    {checkouts.map((checkout) => (
                        <li key={checkout._id} className="mb-4">
                            <div className="bg-white p-4 rounded shadow">
                                <img
                                    src={checkout.imageUrl}
                                    alt={checkout.prescription.originalname}
                                    className="mb-2 w-full h-auto max-w-sm"
                                />
                                <p><strong>Name:</strong> {checkout.name}</p>
                                <p><strong>Address:</strong> {checkout.address}</p>
                                <p><strong>Contact Number:</strong> {checkout.contactNumber}</p>
                                <p><strong>Prescription:</strong> {checkout.prescription.originalname}</p>
                                {checkout.status === 'Confirmed' ? (
                                    <p className="text-green-500"><strong>Status:</strong> Confirmed</p>
                                ) : checkout.status === 'Cancelled' ? (
                                    <p className="text-red-500"><strong>Status:</strong> Cancelled</p>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => handleConfirmOrder(checkout._id)}
                                            className="bg-teal-500 text-white px-4 py-2 rounded mt-2 mr-4"
                                        >
                                            Confirm Order
                                        </button>
                                        <button
                                            onClick={() => handleRejectOrder(checkout._id)}
                                            className="bg-red-500 text-white px-4 py-2 rounded mt-2"
                                        >
                                            Reject Order
                                        </button>
                                    </>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>

            </div>
            <div className='ml-[650px] mt-8 mb-8'>

            <Link to="/admin" className='bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 rounded-full '>Go Back</Link>
            </div>
        </>
    );
};

export default AdminPresPage;
