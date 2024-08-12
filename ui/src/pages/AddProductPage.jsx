import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddProductPage = () => {
  const [productName, setProductName] = useState('')
  const [productId, setProductId] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [productQuantity, setProductQuantity] = useState('')

  const navigate = useNavigate()

  const submitForm = (e) => {
    e.preventDefault()

    const newProduct = {
      productName,
      productId,
      productDescription,
      productPrice,
      productQuantity
    }

    const res = addProduct(newProduct)
    toast.success('Product added successfully')
    navigate('/products')
    console.log(res)
  }

  const addProduct = async (newProduct) => {
    const res = await fetch('api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newProduct)
    })
    return res;
  }

  return (
    <>
      <section className="bg-teal-50 mb-20">
        <div className="container m-auto max-w-2xl py-2">
          <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <form onSubmit={submitForm}>
              <h2 className="text-3xl text-teal-800 text-center font-semibold mb-6">
                Add Product
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
                  className="bg-teal-500 hover:bg-teal-600 my-10  text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddProductPage;
