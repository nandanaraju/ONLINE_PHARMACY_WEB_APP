import { Link, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { getUserType } from "./LoginPage";
const ProductPage = () => {
    
    const { id } = useParams();
    const product = useLoaderData();
    const navigate = useNavigate();
    const userType = getUserType();

    const deleteProduct = async () => {
        const confirm = window.confirm("Sure want to delete?!");
        if (!confirm) return;
        const res = await fetch(`/api/products/${id}`, {
            method: "DELETE",
        });
        navigate("/products");
    };

    return (
        <>
            <div className="bg-white text-gray-900 mb-10 pb-10">
                <div className="max-w-4xl mx-auto p-5 ">
                    <section>
                        <Link
                            className="flex items-center my-5 gap-1 font-medium  "
                            to="/products"
                        >
                            {" "}
                            Back to Products
                        </Link>
                    </section>

                    <div className="bg-teal-100 shadow-lg rounded-lg overflow-hidden">
                        <img
                            src=""
                            alt="Course Thumbnail"
                            className="w-full h-64 object-cover"
                        />
                        <div className="p-6">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                                <h1 className="text-3xl font-bold text-teal-800">
                                    {product.productName}
                                </h1>
                                <div className="flex items-center mt-2 sm:mt-0">
                                    <span className="text-2xl text-red-500 font-semibold mr-4">
                                        {product.productPrice}
                                    </span>
                                    <button className="bg-teal-500 text-white px-6 py-2 rounded hover:bg-teal-600">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                            <div className="mb-6">
                                <h2 className="text-2xl font-semibold text-teal-800 mb-2">
                                    Description
                                </h2>
                                <p>{product.productDescription}</p>
                            </div>

                            

                            
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-end gap-4 mr-[205px] ">
                    {userType == "admin" && (
                        <>
                            <Link
                                to={`/edit-product/${id}`}
                                className="flex bg-blue-500 hover:bg-blue-600 text-white font-bold  rounded-full h-10 w-32 focus:outline-none focus:shadow-outline justify-center items-center"
                            >
                                Edit Product
                            </Link>
                            <button
                                onClick={deleteProduct}
                                className="flex bg-red-500 hover:bg-red-600 text-white font-bold  rounded-full h-10 w-32 focus:outline-none focus:shadow-outline  justify-center items-center"
                            >
                                Remove Product
                            </button>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

const productLoader = async ({ params }) => {
    console.log(params)
    const res = await fetch(`http://localhost:5000/products/${params.id}`);
    const data = await res.json();
    return data;
};

export { ProductPage as default, productLoader };
