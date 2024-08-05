import React from 'react'
import{Link} from 'react-router-dom'
import img1 from '../assets/images/img1.png'

const Home = () => {
    return (
        <>
        <div className="flex justify-center mt-8">
        
        </div>
        <div className="container mx-auto mt-8 px-4">
            <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 p-4 mt-28">
                    <h1 className="text-4xl font-bold mb-4">Welcome to Carewell Pharmacy</h1>
                    <p className="text-lg mb-8">At Carewell Pharmacy, your health and well-being are our top priorities. We are dedicated to providing you with the highest quality pharmaceutical care, exceptional customer service, and a wide range of products to meet all your healthcare needs.</p>
                    <p className="text-lg mb-8">Experience the difference at Carewell Pharmacy, where your health is in good hands. Visit us in-store or explore our website to discover all the ways we can support your health journey.</p>
                
                    <Link to="/products" type="submit" className="px-3 bg-teal-500 text-white py-3 rounded-lg font-semibold hover:bg-teal-400">Get Services</Link>
    
                </div>
                <div className="w-full md:w-1/2 p-4 flex justify-center items-center">
                    <img src={img1} alt="Placeholder Image" className="w-full rounded shadow h-auto md:h-[500px] object-cover"/>
                </div>
            </div>
        </div>
        </>
    )
}

export default Home