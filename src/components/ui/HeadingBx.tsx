const HeadingBx = ({ title, color }: { title: string, color: string}) => {
    return (
        <div className="text-center mb-8 relative w-fit h-fit px-3 py-2 sm:px-4 sm:py-3">
            <span className={`absolute top-0 -right-5 w-28 sm:w-36 h-0.5 bg-${color}`} />
            <span className={`absolute bottom-0.5 sm:bottom-5 right-0 w-0.5 h-16 bg-${color}`} />
            <h2 className={`text-xl sm:text-4xl font-bold tracking-wide uppercase dark:text-white text-black`}>{title}</h2>
            <span className={`absolute bottom-0 -left-5 w-28 sm:w-36 h-0.5 bg-${color}`} />
            <span className={`absolute top-0.5 sm:top-5 left-0 w-0.5 h-16 bg-${color}`} />
        </div>
    )
}

export default HeadingBx