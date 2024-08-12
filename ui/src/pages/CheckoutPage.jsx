import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [prescription, setPrescription] = useState(null);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setPrescription(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('address', address);
        formData.append('contactNumber', contactNumber);
        formData.append('prescription', prescription);

        try {
            const response = await fetch('api/checkout', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            if (response.ok) {
                navigate('/order');
            } else {
                console.error('Error:', data.message);
            }
        } catch (error) {
            console.error('Error submitting checkout:', error);
        }
    };

    return (
        

        <div className="min-h-screen bg-cover bg-center flex items-center justify-center"
                style={{ backgroundImage: "url('https://cdn.prod.website-files.com/5f46c318c843828732a6f8e2/6548a29af16906d8c6908cde_Location-Based-Marketing.webp')" }}>
        <main className=" mx-auto mr-[800px] ">
            <section className="w-[400px] mx-auto">
                <h2 className="text-4xl mb-4 font-bold text-teal-600">Checkout Details</h2>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label htmlFor="name" className="block text-left font-semibold mb-2">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="w-full p-1 border border-gray-300 rounded-lg"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="number" className="block text-left font-semibold mb-2">Contact No</label>
                            <input
                                type="text"
                                id="number"
                                name="contactNumber"
                                className="w-full p-1 border border-gray-300 rounded-lg"
                                value={contactNumber}
                                onChange={(e) => setContactNumber(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="address" className="block text-left font-semibold mb-2">Address</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                className="w-full p-1 border border-gray-300 rounded-lg"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="prescription" className="block text-left font-semibold mb-2">Prescription</label>
                            <input
                                type="file"
                                id="prescription"
                                name="prescription"
                                className="w-full p-1 border border-gray-300 rounded-lg"
                                onChange={handleFileChange}
                                required
                            />
                        </div>
                        <button type="submit" className="w-full bg-teal-400 text-white py-2 rounded-lg font-semibold text-center block">
                            Place Order
                        </button>
                    </form>
                </div>
            </section>
        </main>
        </div>
    );
};

export default CheckoutPage;
