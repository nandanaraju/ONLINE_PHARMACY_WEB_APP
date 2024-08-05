import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CartPage = () => {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await fetch('/api/cart',{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ productId, quantity }),

                    });
                
                const data = await response.json();
                setCart(data.cart);
                calculateTotal(data.cart);
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
            const response = await fetch('/api/cart/remove', {
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
            return acc + item.price * item.quantity;
        }, 0);
        setTotal(newTotal);
    };

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
                                        <td className="py-2">{item.price}</td>
                                        <td className="py-2">
                                            <input
                                                type="number"
                                                value={item.quantity}
                                                min="1"
                                                className="border rounded px-2 py-1 w-full"
                                                onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value, 10))}
                                            />
                                        </td>
                                        <td className="py-2">{item.price * item.quantity}</td>
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
                            <p className="font-bold">Total: {total}</p>
                        </div>
                        <Link to="/checkout" className="bg-teal-500 text-white font-bold py-2 px-4 rounded shadow mt-4 inline-block">Proceed to Checkout</Link>
                    </div>
                </section>
            </main>
        </>
    );
};

export default CartPage;
