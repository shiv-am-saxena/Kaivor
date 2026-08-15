import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function MouseFollower() {
	const [isEnabled, setIsEnabled] = useState<boolean>(false);
	const [isVisible, setIsVisible] = useState<boolean>(false);

	const mouseX = useMotionValue(-100);
	const mouseY = useMotionValue(-100);

	const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
	const smoothX = useSpring(mouseX, springConfig);
	const smoothY = useSpring(mouseY, springConfig);

	useEffect(() => {
		const mediaQuery = window.matchMedia("(min-width: 768px)");

		const updateEnabled = () => {
			setIsEnabled(mediaQuery.matches);
		};

		updateEnabled();

		if (mediaQuery.addEventListener) {
			mediaQuery.addEventListener("change", updateEnabled);
		} else {
			mediaQuery.addListener(updateEnabled);
		}

		return () => {
			if (mediaQuery.removeEventListener) {
				mediaQuery.removeEventListener("change", updateEnabled);
			} else {
				mediaQuery.removeListener(updateEnabled);
			}
		};
	}, []);

	useEffect(() => {
		if (!isEnabled) return;

		const handleMouseMove = (e: MouseEvent) => {
			mouseX.set(e.clientX);
			mouseY.set(e.clientY);
			if (!isVisible) setIsVisible(true);
		};

		const handleMouseLeave = () => {
			setIsVisible(false);
		};

		const handleMouseEnter = () => {
			setIsVisible(true);
		};

		window.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("mouseleave", handleMouseLeave);
		document.addEventListener("mouseenter", handleMouseEnter);

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseleave", handleMouseLeave);
			document.removeEventListener("mouseenter", handleMouseEnter);
		};
	}, [isEnabled, isVisible, mouseX, mouseY]);

	if (!isEnabled) return null;

	return (
		<motion.div
			className="pointer-events-none fixed top-0 left-0 z-50 h-8 w-8 rounded-full bg-white mix-blend-difference"
			style={{
				x: smoothX,
				y: smoothY,
				translateX: "-50%",
				translateY: "-50%",
				opacity: isVisible ? 1 : 0
			}}
			initial={{ opacity: 0, scale: 0.5 }}
			animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.5 }}
			transition={{ duration: 0.2 }}
		/>
	);
}
