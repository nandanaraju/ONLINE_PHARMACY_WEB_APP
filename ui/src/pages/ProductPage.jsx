import { Link, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

const ProductPage = () => {
    const { id } = useParams();
    const product = useLoaderData();
    const navigate = useNavigate();
    const [userType, setUserType] = useState(null);
    const [quantity, setQuantity] = useState('');

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

    const cartAdding = async () => {
        if (Number(quantity) > product.productQuantity) {
            toast.error('Quantity exceeds available stock!');
            return;
        }

        try {
            const res = await fetch(`/api/add/${id}/${quantity}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include', 
                body: JSON.stringify({ id, quantity, productName: product.productName, productPrice: product.productPrice })
            });

            if (res.ok) {
                navigate('/cart-page');
            } else {
                console.error('Failed to add product to cart:', await res.json());
            }
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };

    const deleteProduct = async () => {
        const confirm = window.confirm("Sure want to delete?!");
        if (!confirm) return;

        try {
            const res = await fetch(`/api/products/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                navigate("/products");
            } else {
                console.error('Failed to delete product:', await res.json());
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div className="bg-white text-gray-900 mb-10 pb-10">
            <div className="max-w-4xl mx-auto p-5">

                <div className="bg-teal-100 shadow-xl rounded-xl overflow-hidden h-auto">
                    <div className="p-6 space-y-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                            <h1 className="text-4xl font-bold text-teal-800">{product.productName}</h1>
                            <div className="flex items-center mt-4 sm:mt-0">
                                <p className="text-xl font-bold mr-4">Price:</p>
                                <span className="text-3xl text-red-500 font-semibold mr-4">₹{product.productPrice}</span>
                                {userType === 'user' && (
                                    <div className="flex flex-col items-center">
                                        <label className="block text-xl text-gray-700 font-bold mt-4">Quantity</label>
                                        <input
                                            type="number"
                                            id="quantity"
                                            name="quantity"
                                            className="border-2 border-teal-500 rounded-lg py-2 px-4 mb-4 mt-2 focus:outline-none focus:ring-2 focus:ring-teal-600"
                                            required
                                            value={quantity}
                                            onChange={(e) => setQuantity(e.target.value)}
                                        />
                                        <button onClick={cartAdding} className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-6 rounded-lg mt-4 transition duration-300 ease-in-out transform hover:-translate-y-1">
                                            Add to cart
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="mb-6">
                            <h2 className="text-2xl font-semibold text-teal-800 mb-2">Description</h2>
                            <p className="text-lg text-gray-700">{product.productDescription}</p>
                        </div>
                        {userType === 'admin' && (
                            <div className="mb-6">
                                <h2 className="text-2xl font-semibold text-teal-800 mb-2">Quantity</h2>
                                <p className="text-lg text-gray-700">{product.productQuantity}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex flex-row justify-end gap-6 mt-6">
                {userType === "admin" && (
                    <>
                        <Link
                            to={`/edit-product/${id}`}
                            className=" mr-8 flex bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-full h-10 w-32 focus:outline-none focus:shadow-outline justify-center items-center transition duration-300 ease-in-out transform hover:-translate-y-1"
                        >
                            Edit Product
                        </Link>
                        <button
                            onClick={deleteProduct}
                            className=" mr-8 flex bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-full h-10 w-32 focus:outline-none focus:shadow-outline justify-center items-center transition duration-300 ease-in-out transform hover:-translate-y-1"
                        >
                            Remove Product
                        </button>
                    </>
                )}
            </div>
            <section className="text-teal-600 text-xl ml-10">
                <Link className="flex items-center my-5 gap-1 font-medium underline decoration-green-600 italic text-[16px]" to="/products">
                    Back to Products
                </Link>
            </section>
        </div>
    );
};

const productLoader = async ({ params }) => {
    const res = await fetch(`/api/products/${params.id}`);
    const data = await res.json();
    return data;
};

export { ProductPage as default, productLoader };
