"use client"

import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react" 
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"

export default function Slider() {
  const slides = [
    {
      src: "/image/image1.jpg", 
      title: "Corporate Conferences",
      desc: "Streamline event planning with modern tools.",
    },
    {
      src: "/image/image2.jpg",
      title: "Team Building Events",
      desc: "Engage employees with seamless event management.",
    },
    {
      src: "/image/image3.jpg",
      title: "Workshops & Seminars",
      desc: "Organize, schedule, and track participation.",
    },
    {
      src: "/image/image4.jpg",
      title: "Networking Sessions",
      desc: "Bring professionals together effortlessly.",
    },
  ]

  return (
    <div className="relative w-full max-w-6xl mx-auto py-6 sm:py-8 px-4">
      <Carousel>
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] overflow-hidden rounded-xl shadow-lg">
                <Image
                  src={slide.src}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                {/* Overlay for text */}
                <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center px-4 sm:px-6">
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white drop-shadow-lg mb-2 sm:mb-3">
                    {slide.title}
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg text-gray-200 drop-shadow">
                    {slide.desc}
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Add arrows */}
        <CarouselPrevious className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/30 rounded-full p-2 hover:bg-black/50 transition-colors">
          <ChevronLeft className="w-6 h-6 text-white" />
        </CarouselPrevious>
        <CarouselNext className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/30 rounded-full p-2 hover:bg-black/50 transition-colors">
          <ChevronRight className="w-6 h-6 text-white" />
        </CarouselNext>
      </Carousel>
    </div>
  )
}
