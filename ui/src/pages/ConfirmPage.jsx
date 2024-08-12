import React from 'react';
import img18 from '../assets/images/img18.png';

const ConfirmPage = () => {
    return (
        <>
            <main className="container mx-auto mt-8 flex items-center justify-center bg-teal-50">
                <section className="max-w-md mx-auto text-center h-full">
                    <h2 className="text-3xl font-bold mb-8 text-teal-600">Order Verification</h2>
                    <div className="bg-white p-8 rounded-lg shadow-lg h-full flex flex-col justify-center min-h-80 w-96">
                        <img
                            src={img18}
                            alt=""
                            className="size-12 ml-32 mb-4 animate-bounce"
                        />
                        <p className="text-lg mb-4">Your order has been submitted for Verification!</p>
                        <p className="text-lg mb-4">Please wait for a few minutes and check your profile for updates</p>
                        <a href="/" className="bg-teal-400 text-white py-2 px-0 mx-8 rounded-lg font-semibold mt-6">Go to Home</a>
                    </div>
                </section>
            </main>
        </>
    );
};

export default ConfirmPage;
