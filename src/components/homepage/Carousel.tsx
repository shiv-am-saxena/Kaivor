import React, { useState, useEffect, useCallback } from 'react';
import { useAppSelector } from '../../context/hooks';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CarouselSlide {
    order?: number;
    imageUrl?: string;
    videoUrl?: string | null;
    title: string;
    description?: string;
    buttonText?: string;
    buttonLink?: string;
    startDate?: Date | string | null;
    endDate?: Date | string | null;
    isActive?: boolean;
}

const AUTOPLAY_DURATION = 6000; // 6 seconds

// const Carousel: React.FC = () => {
//     const { carousel } = useAppSelector((state) => state.homepage) as { carousel: any };
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const [isPaused, setIsPaused] = useState(false);
//     const [direction, setDirection] = useState(1);

//     // Filter valid active slides
//     const slides: CarouselSlide[] = (carousel?.slides || [])
//         .filter((slide: CarouselSlide) => slide?.isActive !== false)
//         .sort((a: CarouselSlide, b: CarouselSlide) => (a.order || 0) - (b.order || 0));

//     const totalSlides = slides.length;
//     const isAutoplayEnabled = carousel?.autoplay !== false && totalSlides > 1;

//     const nextSlide = useCallback(() => {
//         setDirection(1);
//         setCurrentIndex((prev) => (prev + 1) % totalSlides);
//     }, [totalSlides]);

//     const prevSlide = useCallback(() => {
//         setDirection(-1);
//         setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
//     }, [totalSlides]);

//     const goToSlide = (index: number) => {
//         setDirection(index > currentIndex ? 1 : -1);
//         setCurrentIndex(index);
//     };

//     useEffect(() => {
//         if (!isAutoplayEnabled || isPaused || totalSlides <= 1) return;

//         const timer = setInterval(() => {
//             nextSlide();
//         }, AUTOPLAY_DURATION);

//         return () => clearInterval(timer);
//     }, [isAutoplayEnabled, isPaused, nextSlide, totalSlides, currentIndex]);

//     if (!carousel || carousel?.isActive === false || totalSlides === 0) {
//         return null;
//     }

//     const currentSlide = slides[currentIndex];

//     const getImageSource = (url?: string) => {
//         if (!url) return '';
//         if (url.startsWith('http://') || url.startsWith('https://')) return url;
//         const cfUrl = import.meta.env.VITE_CLOUDFRONT_URL || '';
//         return cfUrl ? `${cfUrl}/${url}` : url;
//     };

//     const slideVariants = {
//         initial: (dir: number) => ({
//             opacity: 0,
//             scale: 1.03,
//             x: dir > 0 ? 30 : -30
//         }),
//         animate: {
//             opacity: 1,
//             scale: 1,
//             x: 0,
//             transition: {
//                 duration: 0.6,
//                 ease: [0.32, 0.72, 0, 1]
//             }
//         },
//         exit: (dir: number) => ({
//             opacity: 0,
//             scale: 0.98,
//             x: dir > 0 ? -30 : 30,
//             transition: {
//                 duration: 0.5,
//                 ease: [0.32, 0.72, 0, 1]
//             }
//         })
//     };

//     return (
//         <section
//             aria-label="Featured Carousel"
//             onMouseEnter={() => setIsPaused(true)}
//             onMouseLeave={() => setIsPaused(false)}
//             className="group relative w-full h-[60vh] sm:h-[70vh] md:h-screen lg:h-[80vh] xl:h-[90vh] max-h-230 min-h-115 overflow-hidden bg-black text-white select-none"
//         >
//             {/* Slide Content with Animation */}
//             <AnimatePresence initial={false} custom={direction} mode="wait">
//                 <motion.div
//                     key={currentIndex}
//                     custom={direction}
//                     variants={slideVariants}
//                     initial="initial"
//                     animate="animate"
//                     exit="exit"
//                     className="absolute inset-0 w-full h-full"
//                 >
//                     {/* Media: Video or Image */}
//                     {currentSlide.videoUrl ? (
//                         <video
//                             src={currentSlide.videoUrl}
//                             poster={getImageSource(currentSlide.imageUrl)}
//                             autoPlay
//                             muted
//                             loop
//                             playsInline
//                             className="w-full h-full object-cover object-center"
//                         />
//                     ) : currentSlide.imageUrl ? (
//                         <img
//                             src={getImageSource(currentSlide.imageUrl)}
//                             alt={currentSlide.title || `Slide ${currentIndex + 1}`}
//                             className="w-full h-full object-contain object-top"
//                             loading={currentIndex === 0 ? 'eager' : 'lazy'}
//                         />
//                     ) : (
//                         <div className="w-full h-full bg-neutral-900" />
//                     )}

//                     {/* Hover-Only Overlay with Centered Accent Button */}
//                     <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 z-20 pointer-events-none group-hover:pointer-events-auto">
//                         {currentSlide.title && (
//                             <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white text-center tracking-tight mb-5 drop-shadow-lg transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300 max-w-2xl px-4">
//                                 {currentSlide.title}
//                             </h2>
//                         )}

//                         <Link
//                             to={currentSlide.buttonLink || '/'}
//                             className="inline-flex items-center gap-2.5 px-7 py-3.5 sm:px-8 sm:py-4 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm sm:text-base tracking-wide transition-all shadow-xl shadow-orange-500/30 hover:scale-105 active:scale-95 cursor-pointer"
//                         >
//                             <span>{currentSlide.buttonText || 'Explore Drop'}</span>
//                             <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
//                         </Link>
//                     </div>
//                 </motion.div>
//             </AnimatePresence>

//             {/* Bar-Styled-Pagination & Controls at Bottom Right Corner (Always Visible) */}
//             {totalSlides > 1 && (
//                 <div className="absolute bottom-5 right-5 sm:bottom-8 sm:right-8 md:bottom-10 md:right-12 z-30 flex items-center gap-3 sm:gap-4 bg-black/45 dark:bg-black/60 backdrop-blur-md px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full border border-white/10 shadow-lg pointer-events-auto">
//                     {/* Slide Index Display */}
//                     <span className="font-mono text-xs sm:text-sm font-semibold text-neutral-300 tabular-nums">
//                         0{currentIndex + 1}
//                         <span className="text-neutral-500 mx-1">/</span>
//                         0{totalSlides}
//                     </span>

//                     {/* Bar-styled Progress Pagination */}
//                     <div className="flex items-center gap-1.5 sm:gap-2">
//                         {slides.map((_, index) => {
//                             const isActive = currentIndex === index;
//                             return (
//                                 <button
//                                     key={index}
//                                     onClick={() => goToSlide(index)}
//                                     aria-label={`Go to slide ${index + 1}`}
//                                     className="group/btn relative h-1.5 sm:h-2 rounded-full overflow-hidden transition-all duration-300 cursor-pointer"
//                                     style={{
//                                         width: isActive ? '36px' : '16px'
//                                     }}
//                                 >
//                                     {/* Track background */}
//                                     <span className="absolute inset-0 bg-white/25 group-hover/btn:bg-white/45 transition-colors" />

//                                     {/* Active Autoplay Progress Bar */}
//                                     {isActive && (
//                                         <motion.span
//                                             key={`${currentIndex}-${isPaused}`}
//                                             initial={{ width: '0%' }}
//                                             animate={{ width: '100%' }}
//                                             transition={{
//                                                 duration: isPaused ? 0 : AUTOPLAY_DURATION / 1000,
//                                                 ease: 'linear'
//                                             }}
//                                             className="absolute inset-y-0 left-0 bg-orange-500 dark:bg-orange-400 rounded-full shadow-xs"
//                                         />
//                                     )}
//                                 </button>
//                             );
//                         })}
//                     </div>

//                     {/* Navigation Arrow Controls */}
//                     <div className="flex items-center gap-1 pl-1 border-l border-white/15">
//                         <button
//                             onClick={prevSlide}
//                             aria-label="Previous slide"
//                             className="p-1 rounded-full text-neutral-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
//                         >
//                             <ChevronLeft className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
//                         </button>
//                         <button
//                             onClick={nextSlide}
//                             aria-label="Next slide"
//                             className="p-1 rounded-full text-neutral-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
//                         >
//                             <ChevronRight className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </section>
//     );
// };



const Carousel: React.FC = () => {
    const { carousel } = useAppSelector((state) => state.homepage) as { carousel: any };
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [direction, setDirection] = useState(1);

    // Filter valid active slides
    const slides: CarouselSlide[] = (carousel?.slides || [])
        .filter((slide: CarouselSlide) => slide?.isActive !== false)
        .sort((a: CarouselSlide, b: CarouselSlide) => (a.order || 0) - (b.order || 0));

    const totalSlides = slides.length;
    const isAutoplayEnabled = carousel?.autoplay !== false && totalSlides > 1;
    const genSrc = (path: string) => {
        if (!path) return '';
        if (path.startsWith('http://') || path.startsWith('https://')) return path;
        const cfUrl = import.meta.env.VITE_CLOUDFRONT_URL;
        return cfUrl ? `${cfUrl}/${path}` : path;
    }

    const nextSlide = useCallback(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, [totalSlides]);

    const prevSlide = useCallback(() => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    }, [totalSlides]);

    const goToSlide = (index: number) => {
        setDirection(index > currentIndex ? 1 : -1);
        setCurrentIndex(index);
    };

    useEffect(() => {
        if (!isAutoplayEnabled || isPaused || totalSlides <= 1) return;

        const timer = setInterval(() => {
            nextSlide();
        }, AUTOPLAY_DURATION);

        return () => clearInterval(timer);
    }, [isAutoplayEnabled, isPaused, nextSlide, totalSlides, currentIndex]);

    const slideVariants = {
        initial: (dir: number) => ({
            opacity: 0,
            scale: 1.03,
            x: dir > 0 ? 30 : -30
        }),
        animate: {
            opacity: 1,
            scale: 1,
            x: 0,
            transition: {
                duration: 0.6,
                ease: [0.32, 0.72, 0, 1]
            }
        },
        exit: (dir: number) => ({
            opacity: 0,
            scale: 0.98,
            x: dir > 0 ? -30 : 30,
            transition: {
                duration: 0.5,
                ease: [0.32, 0.72, 0, 1]
            }
        })
    };

    if (!carousel || carousel?.isActive === false || totalSlides === 0) {
        return null;
    }
    return (
        // <section className="relative w-full h-[85vh] md:h-[85vh] lg:h-[85vh] xl:h-[85vh] max-h-230 min-h-115 overflow-hidden bg-black text-white select-none"
        //     aria-label="Featured Carousel"
        //     onMouseEnter={() => setIsPaused(true)}
        //     onMouseLeave={() => setIsPaused(false)}
        // >
        <section className="relative w-full h-fit overflow-hidden bg-black text-white select-none"
            aria-label="Featured Carousel"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Slide Content with Animation */}
            <div className="w-full h-full flex items-start justify-center relative">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={slideVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className={`w-full h-full flex items-center justify-center transition-opacity duration-1000 opacity-100`}
                    >
                        <img
                            src={genSrc(slides[currentIndex].imageUrl as string)}
                            alt={slides[currentIndex].title}
                            className="w-full h-full object-cover object-top"
                        />
                    </motion.div>
                </AnimatePresence>
                {/* Navigation Buttons */}

                <div className="absolute top-1/2 left-0 transform -translate-y-1/2 flex items-center justify-between w-full px-4 z-20">
                    <button
                        onClick={prevSlide}
                        aria-label="Previous slide"
                        className="p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors cursor-pointer hover:text-orange-500"
                    >
                        <ChevronLeft className="w-8 h-8" />
                    </button>
                    <button
                        onClick={nextSlide}
                        aria-label="Next slide"
                        className="p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors cursor-pointer hover:text-orange-500"
                    >
                        <ChevronRight className="w-8 h-8" />
                    </button>
                </div>

                {/* Number of Slides */}
                <div className="absolute bottom-5 right-5 sm:bottom-8 sm:right-8 md:bottom-10 md:right-12 z-30 flex items-center gap-3 sm:gap-4 bg-black/45 dark:bg-black/60 backdrop-blur-md px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full border border-white/10 shadow-lg pointer-events-auto">
                    <span className="font-mono text-xs sm:text-sm font-semibold text-neutral-300 tabular-nums">
                        0{currentIndex + 1}
                        <span className="text-neutral-500 mx-1">/</span>
                        0{totalSlides}
                    </span>
                </div>
                {/* // Bar-Styled-Pagination & Controls at Bottom Right Corner (Always Visible) */}
                <motion.div
                    key={`${currentIndex}-${isPaused}`}
                    className="absolute bottom-0 h-0.5 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10 bg-orange-500"
                    initial={{ width: 0 }}
                    animate={{ width: isPaused ? '0%' : '100%' }}
                    transition={{
                        duration: isPaused ? 0 : AUTOPLAY_DURATION / 1000,
                        ease: 'linear'
                    }}
                />

            </div>
        </section>
    )

}

export default Carousel;