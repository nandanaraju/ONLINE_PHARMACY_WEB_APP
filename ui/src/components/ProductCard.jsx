import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
    return (
        <div className="bg-teal-100 rounded-md shadow-xl flex flex-col items-center justify-center mx-5 my-5 py-5 outline-none  hover:outline-teal-500 outline-4">
            <h2 className="text-3xl mb-4 font-bold text-teal-600">
                {product.productName}
            </h2>
            {/* <img src={product.productImage} alt="product thumbnail" className="w-80 h-40" /> */}
            <p className="text-black my-2 mx-5">{product.productDescription}</p>
            <div className="flex gap-4">
                <Link
                    to={'/products/:id'}
                    className="bg-teal-500 text-white py-2 px-4 rounded mt-6"
                >
                    View Details
                </Link>
                <Link to={'/cart-page'} className="bg-teal-500 text-white py-2 px-4 rounded mt-6">Add to Cart</Link>
            </div>
        </div>
    );
};

export default ProductCard;

