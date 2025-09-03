import React from 'react'

const Testimonials = () => {
  return (
    <div className='w-full h-full mx-auto px-4 py-8 bg-gray-100 rounded-lg shadow-lg mt-14'>
        <h2 className="text-3xl font-bold text-center my-8">What Our Clients Say</h2>
        <div className='flex flex-wrap justify-center gap-6'>
            {/* Testimonial Card */}
            <div className='bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto'>
                <div className='flex items-center gap-2'>
                   <img src="https://cdn-icons-png.flaticon.com/512/8847/8847419.png" 
                     className='w-14 h-14 rounded-full'
                   />
                   <p className='text-lg font-bold'>Sample Name</p>
                </div>
                <div className='mt-2'>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate, consequuntur.</p>
                    <div className='mt-2 flex items-center gap-2 text-2xl'>
                        <span className="text-yellow-500">★ ★ ★ ★ ★</span>
                    </div>
                </div>
            </div>
            {/* Testimonial Card */}
            <div className='bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto'>
                <div className='flex items-center gap-2'>
                   <img src="https://cdn-icons-png.flaticon.com/512/8847/8847419.png" 
                     className='w-14 h-14 rounded-full'
                   />
                   <p className='text-lg font-bold'>Sample Name</p>
                </div>
                <div className='mt-2'>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate, consequuntur.</p>
                    <div className='mt-2 flex items-center gap-2 text-2xl'>
                        <span className="text-yellow-500">★ ★ ★ ★ ★</span>
                    </div>
                </div>
            </div>
            {/* Testimonial Card */}
            <div className='bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto'>
                <div className='flex items-center gap-2'>
                   <img src="https://cdn-icons-png.flaticon.com/512/8847/8847419.png" 
                     className='w-14 h-14 rounded-full'
                   />
                   <p className='text-lg font-bold'>Sample Name</p>
                </div>
                <div className='mt-2'>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate, consequuntur.</p>
                    <div className='mt-2 flex items-center gap-2 text-2xl'>
                        <span className="text-yellow-500">★ ★ ★ ★ ★</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Testimonials