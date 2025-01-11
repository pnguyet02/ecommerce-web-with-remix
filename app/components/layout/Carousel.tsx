import React, { useState } from "react";

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const banners = [
    "/images/banner1.jpg",
    "/images/banner2.jpg",
    "/images/banner3.png",
  ];

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  const prevSlide = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + banners.length) % banners.length
    );
  };

  return (
    <div
      id="carouselExample"
      className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden"
    >
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${activeIndex * 100}%)`, // Điều chỉnh carousel khi thay đổi activeIndex
          }}
        >
          {banners.map((banner, index) => (
            <div key={index} className="w-full flex-none px-2">
              {" "}
              {/* Thêm margin bên trái và phải */}
              <img
                src={banner}
                alt={`Banner ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Các nút điều khiển (next và prev) */}
      <button
        type="button"
        onClick={prevSlide}
        className="absolute top-1/2 left-0 z-10 flex items-center justify-center px-4 py-2 text-white bg-black bg-opacity-50 hover:bg-opacity-75 rounded-l-full transform -translate-y-1/2"
      >
        <span className="sr-only">Previous</span>
        <svg
          aria-hidden="true"
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          ></path>
        </svg>
      </button>
      <button
        type="button"
        onClick={nextSlide}
        className="absolute top-1/2 right-0 z-10 flex items-center justify-center px-4 py-2 text-white bg-black bg-opacity-50 hover:bg-opacity-75 rounded-r-full transform -translate-y-1/2"
      >
        <span className="sr-only">Next</span>
        <svg
          aria-hidden="true"
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default Carousel;
