import React, { useState, useEffect } from 'react';


const MessagePage = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch('api/messages');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setMessages(data);
            } catch (error) {
                console.error('There was an error fetching the messages!', error);
            }
        };

        fetchMessages();
    }, []);

    return (
        <>
            <div className="container mx-auto my-10">
                <h1 className="text-3xl font-bold mb-5">Messages</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">Email</th>
                                <th className="py-2 px-4 border-b">Mobile Number</th>
                                <th className="py-2 px-4 border-b">Message</th>
                                <th className="py-2 px-4 border-b">Sent At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {messages.map((message) => (
                                <tr key={message._id}>
                                    <td className="py-2 px-4 border-b">{message.email}</td>
                                    <td className="py-2 px-4 border-b">{message.mobileNumber}</td>
                                    <td className="py-2 px-4 border-b">{message.message}</td>
                                    <td className="py-2 px-4 border-b">{new Date(message.createdAt).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default MessagePage;
