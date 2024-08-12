import React from 'react';
import { Link } from 'react-router-dom';
import img1 from '../assets/images/img1.png';

const Home = () => {
    return (
        <>
            <div className=" bg-teal-50 mt-[10px] mb-[20px] mx-auto flex flex-col-reverse md:flex-row items-center justify-between px-4 py-16 bg-teal-50 md:space-x-8 mt-8">
                <div className="w-full md:w-2/5 mt-10 md:mt-0 ml-[100px]">
                    <h1 className="text-5xl font-bold text-teal-800 mb-6">Welcome to Carewell Pharmacy</h1>
                    <p className="text-lg text-gray-600 mb-6">At Carewell Pharmacy, your health and well-being are our top priorities. We are dedicated to providing you with the highest quality pharmaceutical care, exceptional customer service, and a wide range of products to meet all your healthcare needs.</p>
                    <p className="text-lg text-gray-600 mb-8">Experience the difference at Carewell Pharmacy, where your health is in good hands. Visit us in-store or explore our website to discover all the ways we can support your health journey.</p>
                    <Link to="/products" className="inline-block bg-teal-500 text-white text-lg font-semibold py-2 px-8 rounded-full shadow-md hover:bg-teal-400">
                        GET STARTED
                    </Link>
                </div>
                <div className="w-full md:w-3/5 flex justify-center items-center">
                    <img src={img1} alt="Placeholder Image" className="max-w-full h-auto md:h-[450px] object-contain rounded-lg shadow-lg ml-16" />
                </div>
            </div>
        </>
    );
}

export default Home;
