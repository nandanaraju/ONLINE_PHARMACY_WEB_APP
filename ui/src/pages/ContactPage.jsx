import React, { useState } from 'react';


const ContactPage = () => {
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const contactData = {
            email,
            mobileNumber: phoneNumber,
            message,
        };

        try {
            const response = await fetch('api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contactData),
            });

            if (response.ok) {
                setSuccessMessage('Thank you! Your message has been sent.');
                setEmail('');
                setPhoneNumber('');
                setMessage('');
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error('Error submitting the form:', error);
            setSuccessMessage('An error occurred. Please try again.');
        }
    };

    return (
        <>
            <div className="min-h-screen bg-cover bg-center flex items-center justify-center"
                style={{ backgroundImage: "url('https://img.freepik.com/free-photo/top-view-blue-monday-concept-composition-with-telephone_23-2149139103.jpg?size=626&ext=jpg&ga=GA1.1.414470015.1718158445&semt=ais_hybrid')" }}>
                <div className="container mx-auto my-10 p-6 bg-white rounded shadow-md backdrop-blur-sm bg-opacity-70">
                    <h1 className="text-3xl font-bold mb-5 text-teal-600">Contact Us</h1>
                    {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email:
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full p-3 border rounded focus:outline-none focus:ring-1 focus:ring-teal-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
                                Phone Number:
                            </label>
                            <input
                                type="text"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                                className="w-full p-3 border rounded focus:outline-none focus:ring-1 focus:ring-teal-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                                Message:
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                                className="w-full p-3 border rounded focus:outline-none focus:ring-1 focus:ring-teal-500"
                                rows="5"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-teal-500 text-white font-bold py-2 px-4 rounded-full"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ContactPage;
