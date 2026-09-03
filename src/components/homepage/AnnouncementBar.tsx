import React, { useEffect, useState } from 'react';
import { Flame, ChevronRight } from 'lucide-react';
import { useAppSelector } from '../../context/hooks';

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isExpired: boolean;
}

const calculateTimeLeft = (targetDate: string | Date): TimeLeft => {
    const diff = new Date(targetDate).getTime() - new Date().getTime();
    if (isNaN(diff) || diff <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
    }

    return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
        isExpired: false
    };
};

const FlipBlock: React.FC<{ value: string; label: string; isHighlight?: boolean }> = ({
    value,
    label,
    isHighlight = false
}) => (
    <div className="flex flex-col items-center min-w-7 sm:min-w-8">
        <div
            className={`relative w-full flex items-center justify-center rounded-md px-1.5 py-0.5 border shadow-xs transition-colors overflow-hidden ${isHighlight
                ? 'bg-linear-to-b from-orange-500/15 to-amber-500/25 border-orange-500/40 text-orange-600 dark:from-orange-500/30 dark:to-amber-600/30 dark:border-orange-500/50 dark:text-amber-300'
                : 'bg-neutral-100 border-neutral-300/80 text-neutral-900 dark:bg-neutral-900/90 dark:border-neutral-700/80 dark:text-white'
                }`}
        >
            <span className="font-mono text-xs sm:text-sm font-extrabold tabular-nums tracking-tight z-10">
                {value}
            </span>
            {/* Flip line divider */}
            <div className="absolute inset-x-0 top-1/2 h-px bg-neutral-300/80 dark:bg-white/10" />
            {/* Gloss shine reflection */}
            <div className="absolute inset-x-0 top-0 h-1/2 bg-white/20 dark:bg-white/5 pointer-events-none" />
        </div>
        <span
            className={`text-[8px] sm:text-[9px] font-bold uppercase tracking-wider mt-0.5 ${isHighlight
                ? 'text-orange-600 dark:text-amber-400'
                : 'text-neutral-500 dark:text-neutral-400'
                }`}
        >
            {label}
        </span>
    </div>
);

const AnnouncementBar: React.FC = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { announcement } = useAppSelector((state) => state.homepage) as { announcement: any };
    const targetDate = announcement?.countDownTimer;
    const [, setTick] = useState(0);
    const timeLeft = targetDate ? calculateTimeLeft(targetDate) : null;

    useEffect(() => {
        if (!targetDate) {
            return;
        }

        const interval = setInterval(() => {
            setTick((tick) => tick + 1);
            if (calculateTimeLeft(targetDate).isExpired) {
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    if (!announcement || announcement?.isActive === false) return null;

    const pad = (num: number) => String(num).padStart(2, '0');

    return (
        <aside
            aria-label="Announcement"
            className="w-full relative z-40 bg-neutral-50/95 dark:bg-neutral-950 border-b border-neutral-200/90 dark:border-neutral-800/90 text-neutral-900 dark:text-white py-2 px-3 sm:px-6 transition-colors shadow-xs"
        >
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-2.5">
                {/* Left / Center: Announcement Title with Fire Icon */}
                <div className="flex items-center gap-2.5 mx-auto md:mx-0">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-500/10 dark:bg-orange-500/15 border border-orange-500/25 dark:border-orange-500/30 text-orange-600 dark:text-orange-400 shadow-xs">
                        <Flame className="w-3.5 h-3.5 animate-pulse" />
                    </div>
                    <p className="text-xs sm:text-sm font-semibold tracking-tight text-neutral-800 dark:text-neutral-100">
                        {announcement?.title}
                    </p>
                </div>

                {/* Right: Timer & Action Area */}
                <div className="flex items-center gap-3.5 mx-auto md:mx-0">
                    {timeLeft && !timeLeft.isExpired && (
                        <div className="flex items-center gap-1 sm:gap-1.5 bg-white/90 dark:bg-black/40 border border-neutral-200 dark:border-neutral-800 px-2.5 py-1 rounded-xl backdrop-blur-md shadow-xs dark:shadow-none">
                            {timeLeft.days > 0 && (
                                <>
                                    <FlipBlock value={pad(timeLeft.days)} label="Days" />
                                    <span className="text-neutral-400 dark:text-neutral-600 font-bold text-xs -mt-3.5">:</span>
                                </>
                            )}
                            <FlipBlock value={pad(timeLeft.hours)} label="Hrs" />
                            <span className="text-neutral-400 dark:text-neutral-600 font-bold text-xs -mt-3.5">:</span>
                            <FlipBlock value={pad(timeLeft.minutes)} label="Mins" />
                            <span className="text-neutral-400 dark:text-neutral-600 font-bold text-xs -mt-3.5">:</span>
                            <FlipBlock value={pad(timeLeft.seconds)} label="Secs" isHighlight />
                        </div>
                    )}

                    {announcement?.buttonText && announcement?.buttonLink && (
                        <a
                            href={announcement.buttonLink}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-linear-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 dark:hover:from-orange-400 dark:hover:to-amber-400 text-neutral-950 font-bold text-xs tracking-tight transition-all shadow-xs hover:shadow-orange-500/20 active:scale-95"
                        >
                            <span>{announcement.buttonText}</span>
                            <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                        </a>
                    )}
                </div>
            </div>
        </aside>
    );
};

export default AnnouncementBar;