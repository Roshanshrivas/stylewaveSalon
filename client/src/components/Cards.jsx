import React, { useEffect, useRef, useState } from 'react';

const Cards = () => {
    const cardData = [
        {
            title: 'Hair Cut',
            description: 'Hair Cutting started Just at Rs.59/-',
            image: 'https://img.freepik.com/free-photo/client-doing-hair-cut-barber-shop-salon_1303-20850.jpg',
            Link: '/',
        },
        {
            title: 'Beard Shave',
            description: 'Beard Shave started Just at Rs.29/-',
            image: 'https://thebeardclub.com/cdn/shop/articles/cutting_beard_growth_1c6f9f2f-02be-4a6a-8ce4-01100791bdc9_1200x630.jpg?v=1651237897',
            Link: '/',
        },
        {
            title: 'Facial',
            description: 'Face Facial started Just at Rs.49/-',
            image: 'https://blog.californiaskincaresupply.com/wp-content/uploads/2022/04/man-beard-get-facial-1024x684.jpg',
            Link: '/',
        },
        {
            title: 'Hair Coloring',
            description: 'Hair Coloring started Just at Rs.59/-',
            image: 'https://cdn.citymapia.com/idukki/royal-star-gents-beauty-parlour/21822/Portfolio.jpg?biz=5293',
            Link: '/',
        },
    ];


    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {cardData.map((card, index) => (
                <div
                    key={index}
                    className="relative rounded-lg overflow-hidden shadow-md h-[250px] flex items-center justify-center text-center"
                >
                    {/* Background Image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: `url(${card.image})`,
                        }}
                    />

                    {/* Black Overlay */}
                    <div className="absolute inset-0 bg-black/50"></div>

                    {/* Text Content */}
                    <div className="relative z-10 text-white">
                        <h2 className="text-2xl font-bold mb-2 text-accent">{card.title}</h2>
                        <p className="text-lg">{card.description}</p>
                        {/* Button */}
                        {card.Link && (
                            <a href={card.Link} className="mt-4 inline-block px-6 py-2 bg-pink-500 hover:bg-pink-600 rounded-lg transition text-white font-semibold">
                                Learn More
                            </a>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Cards;
