import React, { useState, useEffect, useCallback } from 'react';
import { useAppSelector } from '../../context/hooks';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence, type Variants } from 'motion/react';

interface CarouselSlide {
    order?: number;
    imageUrl?: string;
    videoUrl?: string | null;
    orientation?: 'portrait' | 'landscape';
    title: string;
    description?: string;
    buttonText?: string;
    buttonLink?: string;
    startDate?: Date | string | null;
    endDate?: Date | string | null;
    isActive?: boolean;
}

const AUTOPLAY_DURATION = 6000; // 6 seconds

const Carousel: React.FC = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { carousel } = useAppSelector((state) => state.homepage) as { carousel: any };
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [direction, setDirection] = useState(1);
    const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
    // Filter valid active slides
    const slides: CarouselSlide[] = (carousel?.slides || [])
        .filter((slide: CarouselSlide) => (slide?.isActive !== false) && (slide.orientation === orientation))
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

    useEffect(() => {
        const updateOrientation = () => {
            setOrientation(window.innerWidth > window.innerHeight ? 'landscape' : 'portrait');
        };

        updateOrientation();
        window.addEventListener('resize', updateOrientation);
        return () => window.removeEventListener('resize', updateOrientation);
    }, []);

    useEffect(() => {
        if (!isAutoplayEnabled || isPaused || totalSlides <= 1) return;

        const timer = setInterval(() => {
            nextSlide();
        }, AUTOPLAY_DURATION);

        return () => clearInterval(timer);
    }, [isAutoplayEnabled, isPaused, nextSlide, totalSlides, currentIndex]);

    const slideVariants: Variants = {
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