import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
    return (
    <>
    <div className=" ">
        <div className="bg-teal-50 rounded-md shadow-xl flex flex-col items-center justify-center mx-5 my-5 py-5 outline-none  hover:outline-teal-500 outline-2">
            <h2 className="text-3xl mb-4 font-bold text-teal-600">
                {product.productName}
            </h2>
            <p className="text-black my-2 mx-5">{product.productDescription}</p>
            <div className="flex gap-4">
                <Link
                    to={`/products/${product.productId}`}
                    className="bg-teal-500 text-white py-2 px-4 rounded mt-6"
                >
                    View Details
                </Link>
            </div>
        </div>
        </div>
        </>
    );
};

export default ProductCard;

