import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Heart, Brain, BookOpen, ArrowLeft, ArrowRight } from "lucide-react";

interface Resource {
  type: string;
  title: string;
  link: string;
  gifLink: string;
}

const MeditationResources: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  const resources: Resource[] = [
    {
      type: 'article',
      title: 'Mindfulness Meditation: Benefits and Techniques',
      link: 'https://greatergood.berkeley.edu/article/item/five_ways_mindfulness_meditation_is_good_for_your_health',
      gifLink: 'https://skyogafoundation.org/assets/images/silence.gif',
    },
    {
      type: 'article',
      title: '16 Benefits of Yoga That Are Supported by Science',
      link: 'https://www.healthline.com/nutrition/13-benefits-of-yoga',
      gifLink: 'https://media2.giphy.com/media/lSodnhEO8lphSsxEUy/giphy.gif',
    },
    {
      type: 'article',
      title: 'Beginner Yoga Poses for Relaxation',
      link: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1470658/',
      gifLink: 'https://media2.giphy.com/media/0YLKvc5TheGFh0GJXk/giphy.gif?cid=6c09b952qk938cnspzz9y9uizfrkj2pf750f3dvpmvpmag4p&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s',
    },
    {
      type: 'article',
      title: 'Meditation for Slowing Thoughts',
      link: 'https://www.youtube.com/watch?v=79r4jlECyTs',
      gifLink: 'https://media4.giphy.com/media/Mb42X7rqa0H7YlJsiz/source.gif',
    },
    {
      type: 'article',
      title: 'Beginner Yoga Poses for Relaxation',
      link: 'https://www.yogajournal.com/poses/yoga-by-benefit/calm/yoga-poses-for-relaxation/',
      gifLink: 'https://ub24news.com/wp-content/uploads/2019/06/source-min.gif',
    },
    {
      type: 'article',
      title: '8 Simple Exercises for Stress Relief',
      link: 'https://www.everydayhealth.com/exercise-photos/exercises-that-relieve-stress.aspx',
      gifLink: 'https://d2f8l4t0zpiyim.cloudfront.net/000_clients/61768/page/61768yYxIEAka.gif',
    },
    {
      type: 'article',
      title: 'How Yoga Boosts Your Mental Health',
      link: 'https://www.houstonmethodist.org/blog/articles/2021/sep/the-benefits-of-yoga-how-it-boosts-your-mental-health/',
      gifLink: 'https://media4.giphy.com/media/KDICL3psaxnoeUghMt/giphy.gif?cid=6c09b9525f4v3rtu08oa8spjfefqfmvdbxvlwsnvdzj8h5a1&ep=v1_stickers_related&rid=giphy.gif&ct=s',
    },
    {
      type: 'article',
      title: 'How Meditation strengthens Mental Health',
      link: 'https://www.who.int/news-room/fact-sheets/detail/mental-health-strengthening-our-response/',
      gifLink: 'https://media1.giphy.com/media/19ukzJdtWrkV2dy2eE/source.gif',
    },
    {
      type: 'article',
      title: 'Does Daily Meditation Really Help in Mental Health?',
      link: 'https://www.outlookindia.com/healths/world-mental-health-day-how-does-daily-meditation-really-help-us--news-219648',
      gifLink: 'https://media2.giphy.com/media/GD32HNX7JduZBfHIdZ/giphy.gif',
    },
  ];

  const visibleResources = resources.slice(
    currentIndex,
    currentIndex + 3 > resources.length
      ? resources.length
      : currentIndex + 3
  );

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < resources.length - 3) {
      setDirection(1);
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => {
      return {
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
  };

  return (
    <div className="w-full overflow-hidden px-4 py-16 bg-gradient-to-b ">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center mb-8">
          <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs uppercase tracking-wider rounded-full mb-2">Discover</span>
        </div>
        <h2 className="text-3xl font-light text-center tracking-tight mb-10">
          Mental <span className="font-medium text-purple-600">Wellness</span> Resources
        </h2>
        
        <div className="relative">
          <div 
            ref={sliderRef}
            className="overflow-hidden rounded-2xl"
          >
            <div className="flex flex-wrap md:flex-nowrap justify-center gap-6 p-2">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                {visibleResources.map((resource, index) => (
                  <motion.div
                    key={`${resource.link}-${index}`}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 },
                    }}
                    className="w-full sm:w-[calc(33.333%-1rem)] flex-shrink-0"
                  >
                    <a 
                      href={resource.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block h-full bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group"
                    >
                      <div className="aspect-square overflow-hidden bg-gray-100">
                        <img 
                          src={resource.gifLink} 
                          alt={resource.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-5">
                        <div className="flex items-center gap-2 mb-2">
                          {resource.title.toLowerCase().includes("meditation") ? (
                            <Brain className="h-4 w-4 text-purple-500" />
                          ) : resource.title.toLowerCase().includes("yoga") ? (
                            <Heart className="h-4 w-4 text-purple-500" />
                          ) : (
                            <BookOpen className="h-4 w-4 text-purple-500" />
                          )}
                          <span className="text-xs text-purple-600 font-medium uppercase tracking-wider">
                            {resource.title.toLowerCase().includes("meditation") 
                              ? "Meditation" 
                              : resource.title.toLowerCase().includes("yoga") 
                                ? "Yoga" 
                                : "Wellness"}
                          </span>
                        </div>
                        <h4 className="font-medium text-gray-800 text-lg line-clamp-2 group-hover:text-purple-700 transition-colors">
                          {resource.title}
                        </h4>
                        <div className="mt-3 text-sm text-gray-500">
                          Read article →
                        </div>
                      </div>
                    </a>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
          
          <div className="flex justify-center gap-4 mt-8">
            <Button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              variant="outline"
              size="sm"
              className="rounded-full h-10 w-10 p-0 flex items-center justify-center"
              aria-label="Previous resource"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            
            {/* Pagination dots */}
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.ceil(resources.length / 3) }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > currentIndex / 3 ? 1 : -1);
                    setCurrentIndex(idx * 3);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    Math.floor(currentIndex / 3) === idx
                      ? "bg-purple-600 w-6"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to page ${idx + 1}`}
                />
              ))}
            </div>
            
            <Button
              onClick={handleNext}
              disabled={currentIndex >= resources.length - 3}
              variant="outline" 
              size="sm"
              className="rounded-full h-10 w-10 p-0 flex items-center justify-center"
              aria-label="Next resource"
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeditationResources;