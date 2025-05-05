import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Video {
  id: string;
  title: string;
}

interface VideoSliderProps {
  videos: Video[];
}

const VideoSlider: React.FC<VideoSliderProps> = ({ videos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const slideVariants = {
    hiddenRight: {
      x: "100%",
      opacity: 0,
    },
    hiddenLeft: {
      x: "-100%",
      opacity: 0,
    },
    visible: {
      x: "0",
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? videos.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) =>
      prevIndex === videos.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (!videos || videos.length === 0) {
    return <div className="text-center py-10">No videos available</div>;
  }

  return (
    <div className="w-full overflow-hidden px-4 py-12 relative">
      <div className="flex items-center justify-center mb-8">
        <span className="px-3 py-1 bg-black/5 backdrop-blur-sm text-xs uppercase tracking-wider rounded-full mb-2">Discover</span>
        <h2 className="text-3xl font-light text-center tracking-tight">
          Calming <span className="font-medium">Videos</span>
        </h2>
      </div>
      
      <div 
        ref={sliderRef}
        className="relative aspect-video w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl bg-black/5 backdrop-blur-sm"
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial={direction > 0 ? "hiddenRight" : "hiddenLeft"}
            animate="visible"
            exit="exit"
            className="absolute inset-0 w-full h-full"
          >
            <div className="relative w-full h-full">
              <iframe
                className="w-full h-full rounded-xl"
                src={`https://www.youtube.com/embed/${videos[currentIndex].id}?autoplay=0&rel=0`}
                title={videos[currentIndex].title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        <button
          onClick={handlePrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-lg transition-all duration-300 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 z-10"
          aria-label="Previous video"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-lg transition-all duration-300 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 z-10"
          aria-label="Next video"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
        
        {/* Video indicators */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
          {videos.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-white w-6"
                  : "bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to video ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      <div className="text-center mt-6">
        <h3 className="text-xl font-medium mt-4">{videos[currentIndex].title}</h3>
      </div>
    </div>
  );
};

export default VideoSlider;