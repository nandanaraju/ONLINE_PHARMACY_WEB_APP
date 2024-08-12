import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditProductPage = () => {
  const product = useLoaderData();
  const [productName, setProductName] = useState(product.productName);
  const [productId,setProductId] = useState(product.productId);
  const [productDescription,setProductDescription] = useState(product.productDescription);
  const [productPrice,setProductPrice] = useState(product.productPrice);
  const [productQuantity,setProductQuantity] = useState(product.productQuantity);

  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();

    const updatedProduct = {
    productName,
    productId,
    productDescription,
    productPrice,
    productQuantity
    };

    const res = updateProduct(updatedProduct);
    console.log("respose fron update", res);
    toast.success("Product updated successfully");
    navigate("/products");
    
  };

  const updateProduct = async (updatedProduct) => {
    const res = await fetch(`/api/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });
    return res;
  };

  return (
    <>
      <section className="bg-white mb-20">
        <div className="container m-auto max-w-2xl py-2">
          <div className="bg-teal-100 px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <form onSubmit={submitForm}>
              <h2 className="text-3xl text-teal-800 text-center font-semibold mb-6">
                Update Product
              </h2>

          

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Product Id
                </label>
                <input
                  type="text"
                  id="productId"
                  name="productId"
                  className="border rounded w-full py-2 px-3 mb-2"
                  required
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  id="productName"
                  name="productName"
                  className="border rounded w-full py-2 px-3 mb-2"
                  required
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}

                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Product Quantity
                </label>
                <input
                  type="text"
                  id="productQuantity"
                  name="productQuantity"
                  className="border rounded w-full py-2 px-3 mb-2"
                  required
                  value={productQuantity}
                  onChange={(e) => setProductQuantity(e.target.value)}

                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                >
                  Product Description
                </label>
                <textarea
                  id="productDescription"
                  name="productDescription"
                  className="border rounded w-full py-2 px-3"
                  rows="4"
                  placeholder="Small description on the product"
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                ></textarea>

              </div>


              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                >
                  Product Price
                </label>
                <input
                  type="Number"
                  id="productPrice"
                  name="productPrice"
                  className="border rounded w-full py-2 px-3"
                  required
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                />

              </div>


              <div>
                <button
                  className="bg-teal-500 hover:bg-teal-600 my-10 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Update Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditProductPage;
