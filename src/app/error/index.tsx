import { motion } from "motion/react";
import { ArrowLeft, ArrowUpRight, Home } from "lucide-react";
import { Link } from "react-router-dom";


const ErrorPage = () => {
    return (
        <div className="fixed inset-x-0 top-16 bottom-0 flex min-h-0 flex-col overflow-hidden bg-[#080808] text-white selection:bg-white selection:text-black sm:top-20 2xl:top-24">
            <div className="pointer-events-none absolute inset-0 opacity-30 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-size-[72px_72px]" />
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 0.16, scale: 1 }} transition={{ duration: 1.4, ease: "easeOut" }} className="pointer-events-none absolute -top-32 -right-32 h-130 w-130 rounded-full border border-red-500/40 md:-top-64 md:-right-52 md:h-190 md:w-190" />
            <motion.div initial={{ opacity: 0, rotate: -8 }} animate={{ opacity: 1, rotate: 0 }} transition={{ duration: 1, delay: 0.2, ease: "easeOut" }} className="pointer-events-none absolute top-1/2 -left-20 hidden h-52 w-52 rounded-full border border-white/10 md:block" />

            <main className="relative z-10 mx-auto flex min-h-0 w-full max-w-360 grow flex-col justify-center overflow-hidden px-5 py-4 sm:py-8 md:px-16 md:py-16 2xl:py-20">
                <div className="grid min-h-0 items-center gap-6 sm:gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-24">
                    <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}>
                        <div className="mb-8 flex items-center gap-3 text-xs font-semibold tracking-[0.16em] text-red-400 uppercase"><span className="h-2 w-2 rounded-full bg-red-400 shadow-[0_0_18px_rgba(248,113,113,0.8)]" />Signal lost</div>
                        <h1 className="max-w-3xl text-[clamp(3.5rem,9vw,8.5rem)] leading-[0.88] font-medium tracking-[-0.07em] text-[#f5f2f0]">This look has<span className="block text-neutral-500">left the rack.</span></h1>
                        <p className="mt-8 max-w-md text-base leading-7 text-neutral-400 md:text-lg">The page you were looking for has moved on. Let&apos;s get you back to the collection.</p>
                        <div className="mt-10 flex flex-wrap items-center gap-5">
                            <Link to="/" className="group inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-xs font-semibold tracking-[0.1em] text-black uppercase transition-transform hover:scale-[1.03] active:scale-95"><Home className="h-4 w-4" />Return to store<ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></Link>
                            <button type="button" onClick={() => window.history.back()} className="inline-flex items-center gap-2 py-3 text-xs font-semibold tracking-widest text-neutral-400 uppercase transition-colors hover:text-white"><ArrowLeft className="h-4 w-4" />Go back</button>
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, rotate: 8, scale: 0.92 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} transition={{ duration: 0.9, delay: 0.35, ease: "easeOut" }} className="relative mx-auto flex aspect-square w-[min(62vw,14rem)] items-center justify-center md:mx-0 md:w-auto md:aspect-auto md:h-105">
                        <div className="absolute inset-[10%] rounded-full border border-white/15" /><div className="absolute inset-[22%] rounded-full border border-red-400/40" /><div className="absolute inset-[35%] rounded-full border border-white/10" /><div className="absolute h-px w-full bg-white/10" /><div className="absolute h-full w-px bg-white/10" />
                        <div className="relative flex h-40 w-40 flex-col items-center justify-center rounded-full bg-[#111111] shadow-[0_0_80px_rgba(248,113,113,0.12)] md:h-52 md:w-52"><span className="text-[5rem] leading-none font-medium -tracking-widest text-white md:text-[6.5rem]">404</span><span className="mt-2 text-[9px] font-semibold tracking-[0.2em] text-red-300 uppercase">Not found</span></div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
};

export default ErrorPage;