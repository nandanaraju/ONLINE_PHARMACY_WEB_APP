import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const ProductCards = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("http://localhost:5000/products");
                const data = await res.json();
                setProducts(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <>
            <h1 className="flex flex-col items-center font-bold text-2xl md:text-4xl text-teal-600 pt-10">
                Our Products
            </h1>
            {loading ? (
                <h1>Loading</h1>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mx-5 my-10">
                    {products.map((product) => (
                        <ProductCard key={product.productId} product={product} />
                    ))}
                </div>
            )}
        </>
    );
};

export default ProductCards;
