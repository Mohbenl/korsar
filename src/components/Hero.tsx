"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const slides = [
    {
        id: 1,
        image: "/herosection/slide1.png",
        title: "Built for the Streets. Inspired by the Sea.",
        subtitle:
            "Premium casual wear inspired by maritime heritage and urban culture.",
    },
    {
        id: 2,
        image: "/herosection/slide2.png",
        title: "Refined Casual. Everyday Power.",
        subtitle:
            "Engineered for comfort, designed for presence.",
    },
    {
        id: 3,
        image: "/herosection/slide3.png",
        title: "Limited Pieces. No Restock.",
        subtitle:
            "Exclusive drops for those who move different.",
    },
];

export default function Hero() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative w-full h-screen overflow-hidden z-0">
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                        index === current ? "opacity-100 z-20" : "opacity-0 z-0"
                    }`}
                >
                    {/* IMAGE */}
                    <Image
                        src={slide.image}
                        alt="slide"
                        fill
                        priority
                        className="object-cover scale-110 animate-zoom"
                    />

                    {/* DARK OVERLAY */}
                    <div className="absolute inset-0 bg-black/70 z-10"></div>

                    {/* CONTENT */}
                    <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-6 text-white">

                        <h1 className="text-4xl md:text-6xl font-bold uppercase mb-4 animate-fadeUp">
                            {slide.title}
                        </h1>

                        <p className="text-lg md:text-xl text-gray-300 mb-6 max-w-2xl animate-fadeUp delay-200">
                            {slide.subtitle}
                        </p>

                        <div className="flex gap-4 flex-wrap justify-center animate-fadeUp delay-300">
                            <button className="bg-[#C9A96E] cursor-pointer text-black px-6 py-3 font-semibold hover:bg-[#b8965c] transition">
                                Shop Now
                            </button>

                            <button className="border border-white cursor-pointer px-6 py-3 hover:bg-white hover:text-black transition">
                                Explore
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            {/* DOTS */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-3 z-30">
                {slides.map((_, index) => (
                    <div
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`w-3 h-3 rounded-full cursor-pointer ${
                            index === current ? "bg-[#C9A96E]" : "bg-gray-400"
                        }`}
                    ></div>
                ))}
            </div>

            {/* SCROLL INDICATOR */}
            <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center">
        <span className="text-white text-xs mb-2 opacity-70">
          Scroll
        </span>
                <div className="w-[2px] h-10 bg-white/30 relative overflow-hidden">
                    <div className="w-full h-3 bg-white animate-scroll"></div>
                </div>
            </div>
        </section>
    );
}