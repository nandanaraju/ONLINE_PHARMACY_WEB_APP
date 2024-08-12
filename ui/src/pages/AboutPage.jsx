import React from 'react'
import img13 from '../assets/images/img13.jpg'
import img14 from '../assets/images/img14.jpg'

const AboutPage = () => {
    return (

        <>
            <main class="container mx-auto mt-8 min-h-screen flex items-center justify-center">
                <section class="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                    <h1 class="text-4xl font-bold mb-4 text-center">About Carewell Pharmacy</h1>
                    <p class="text-lg mb-4">At Carewell Pharmacy, we are dedicated to providing top-notch pharmaceutical care and exceptional customer service. Our team of experienced pharmacists and healthcare professionals is committed to your health and well-being. We offer a wide range of products and services to meet all your healthcare needs.</p>
                    <p class="text-lg mb-4">Our mission is to improve the health and wellness of our community through personalized care and a focus on patient education. We believe in building lasting relationships with our customers and providing a welcoming environment where everyone feels valued and respected.</p>
                    <p class="text-lg mb-4">Whether you need prescription medications, over-the-counter products, or advice on managing your health, we are here to help. Visit us in-store or explore our website to learn more about how we can support your health journey.</p>
                    <div class="flex  mt-8">
                        <img src={img13} alt="Carewell Pharmacy" class="rounded-lg shadow-lg h-96 ml-10" />
                        <img src={img14} alt="Carewell Pharmacy" class="rounded-lg shadow-lg h-96 w-96" />
                    </div>
                </section>
            </main>
        </>

    )
}

export default AboutPage