import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const ProductCards = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("/api/products");
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
        <div className="min-h-screen bg-cover bg-center  items-center justify-center"
                style={{ backgroundImage: "url('https://img.freepik.com/premium-photo/blurry-image-counter-with-blurry-background_1031776-178157.jpg?w=1060')" }}>

            <h1 className="flex flex-col items-center font-bold text-4xl md:text-4xl text-teal-800  pt-10">
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
            </div>
        </>
    );
};

export default ProductCards;
