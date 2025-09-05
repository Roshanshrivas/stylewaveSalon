import React from 'react';

const GallerySection = () => {
    const images = [
        "https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1629189784191-9afdcbcb0398?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1554519934-e32b1629d9ee?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1529434173292-b6709e2fe899?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://plus.unsplash.com/premium_photo-1669675936121-6d3d42244ab5?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1640301133857-c4bc5789c1bb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTc1fHxoYWlyY3V0fGVufDB8fDB8fHww",
        "https://images.unsplash.com/photo-1713824096348-c1956e6da321?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZmFjZSUyMGZhY2lhbHxlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1731514771613-991a02407132?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTJ8fGZhY2UlMjBmYWNpYWx8ZW58MHx8MHx8fDA%3D",
    ];

    return (
        <section className="py-10 bg-[#222222] text-white">
            <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold">Our Work Gallery</h2>
                <p className="text-lg mt-2 text-accent">
                    Take a look at our transformations and happy clients
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
                {images.map((src, index) => (
                    <div key={index} className="relative group overflow-hidden rounded-lg shadow-md">
                        <img
                            src={src}
                            alt={`Gallery ${index + 1}`}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center">
                            <p className="text-white text-lg font-semibold">View</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default GallerySection;
