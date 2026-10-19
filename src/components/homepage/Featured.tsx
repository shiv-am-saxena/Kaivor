import { useAppSelector } from '../../context/hooks';
import HeadingBx from '../ui/HeadingBx';

const Featured = () => {
    const { featuredProduct } = useAppSelector((state) => state.homepage) as { featuredProduct: any };

    if (!featuredProduct || !featuredProduct.isActive) return null;

    return (
        <section className="relative w-full h-fit flex flex-col items-center justify-center text-white select-none py-10">
            <HeadingBx title="Featured Products" />
        </section>
    )
}

export default Featured