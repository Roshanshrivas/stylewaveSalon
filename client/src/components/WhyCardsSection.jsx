import React from 'react'

const whyCardsSection = () => {
   const cards = [
        {
            title: 'Expert Stylists',
            description: 'Our team consists of highly trained professionals.',
            image: 'https://imgstaticcontent.lbb.in/lbbnew/wp-content/uploads/sites/2/2017/11/13115431/Bounce-4.png',
        },
        {
            title: 'Quality Products',
            description: 'We use only the best products for your hair and skin.',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVNtV-CnyRM3Wm1YKiofjl0vdkBoYfyhLltQ&s',
        },
        {
            title: 'Relaxing Atmosphere',
            description: 'Enjoy a calm and soothing environment during your visit.',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSUprk9nXHDzeJwpSNEdZV26O_0zQSy2pH0g&s',
        },
        {
            title: 'Affordable Prices',
            description: 'Get premium services at competitive prices.',
            image: 'https://images.pexels.com/photos/17784002/pexels-photo-17784002/free-photo-of-a-woman-in-a-hair-salon.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        },
    ];
  return (
    <div>
        <div className='text-center mt-20'>
        <h2 className='text-2xl md:text-3xl font-bold'>Why Choose Us?</h2>
        <p className='text-lg mt-2'>Experience the best in grooming and styling with our expert team.</p>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 mt-10'>
        {cards.map((card, index) => (
            <div key={index} className='relative rounded-lg overflow-hidden shadow-md h-[350px] flex items-center justify-center text-center'>
            {/* Background Image */}
            <div className='absolute inset-0 bg-cover bg-center' 
            style={{ backgroundImage: `url(${card.image})` }} > 
            </div>
            {/* Black Overlay */}
            <div className='absolute inset-0 bg-black/50'></div>
            {/* Text Content */}
            <div className='relative z-10 text-white p-2'>
                <h2 className='text-2xl font-bold mb-1 text-accent'>{card.title}</h2>
                <p className='text-[17px]'>{card.description}</p> 
            </div>
      </div>
        ))}
    </div>
  </div>
  )
}

export default whyCardsSection