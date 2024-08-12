import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const CartPage = () => {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await fetch('/api/profile', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                console.log('cartdata', data.user.cart);

                setCart(data.user.cart);
                calculateTotal(data.user.cart);
            } catch (error) {
                console.error('Error fetching cart data:', error);
            }
        };
        fetchCart();
    }, []);

    const handleQuantityChange = async (productId, quantity) => {
        try {
            const response = await fetch('/api/cart/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productId, quantity }),
            });
            const data = await response.json();
            if (response.ok) {
                const updatedCart = cart.map(item =>
                    item.productId === productId ? { ...item, quantity } : item
                );
                setCart(updatedCart);
                calculateTotal(updatedCart);
            } else {
                console.error('Error updating cart:', data.error);
            }
        } catch (error) {
            console.error('Error updating cart:', error);
        }
    };

    const handleRemove = async (productId) => {
        try {
            const response = await fetch('/api/remove', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productId }),
            });
            const data = await response.json();
            if (response.ok) {
                const updatedCart = cart.filter(item => item.productId !== productId);
                setCart(updatedCart);
                calculateTotal(updatedCart);
            } else {
                console.error('Error removing item from cart:', data.error);
            }
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    const calculateTotal = (cart) => {
        let newTotal = cart.reduce((acc, item) => {
            return acc + item.productPrice * item.quantity;
        }, 0);
        setTotal(newTotal);
    };

    return (
        <>
            <Navbar/>
            <main className="container mx-auto mt-8">
                <section className="text-center">
                    <h2 className="text-4xl mb-4 font-bold text-teal-600">Shopping Cart</h2>
                    <div className="bg-white p-8 rounded shadow-lg w-3/4 mx-auto mt-16">
                        <table className="min-w-full">
                            <thead>
                                <tr className="w-full bg-gray-100">
                                    <th className="py-2 bg-teal-500 text-white">Items</th>
                                    <th className="py-2 bg-teal-500 text-white">Rate</th>
                                    <th className="py-2 bg-teal-500 text-white">Quantity</th>
                                    <th className="py-2 bg-teal-500 text-white">Total</th>
                                    <th className="py-2 bg-teal-500 text-white">Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map(item => (
                                    
                                    <tr key={item.productId}>
                                        <td className="py-2">{item.productName}</td>
                                        <td className="py-2">₹ {item.productPrice}</td>
                                        <td className="py-2">{item.quantity}</td>
                                        <td className="py-2">₹ {item.productPrice * item.quantity}</td>
                                        <td className="py-2 text-center">
                                            <button
                                                className="text-rose-600 px-4 py-2 rounded"
                                                onClick={() => handleRemove(item.productId)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="flex justify-end mt-4">
                            <p className="font-bold">Total: ₹ {total}</p>
                        </div>
                        <div className="flex mt-4 justify-center gap-6">
                            <Link to="/products" className="bg-teal-500 text-white font-bold py-2 px-4 rounded shadow mt-4 inline-block">Back to products</Link>
                            <Link to="/checkout" className="bg-teal-500 text-white font-bold py-2 px-4 rounded shadow mt-4 inline-block">Proceed to Checkout</Link>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="mt-16 text-center text-gray-500">
                © 2024 Carewell Pharmacy. All rights reserved.
            </footer>
        </>
    );
};

export default CartPage;
