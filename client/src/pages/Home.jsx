import React from 'react'
import Carousel from '../components/Carousel';
import Cards from '../components/Cards';
import WhyCardsSection from '../components/WhyCardsSection';
import GallerySection from '../components/GallerySection';
import BookingForm from '../components/BookingForm';
import Testimonials from '../components/Testimonials';
import BridalGrooming from '../components/BridalGrooming';


const Home = () => {
  return (
    <div>
      {/* Carousel section */}
      <Carousel/>
      {/* Cards section  */}
      <Cards/>
      {/* why are you choose */}
      <WhyCardsSection/>
      {/* BridalGrooming */}
      <BridalGrooming/>
      {/* GallerySection */}
      <GallerySection/>
      {/* Book Your Appointment  */}
      <BookingForm/>
      {/* What Our Clients Say */}
      <Testimonials/>
      <div className='mt-20'></div>
    </div>
    
  )
}

export default Home