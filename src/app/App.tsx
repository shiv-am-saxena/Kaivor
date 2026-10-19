import { useEffect } from 'react'
import res from "../data/const.json";
import { useAppDispatch } from '../context/hooks';
import { setData } from '../context/slices/homepage.slice';
import Carousel from '../components/homepage/Carousel';
import Featured from '../components/homepage/Featured';
const App = () => {
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(setData(res.data.data));
	}, [dispatch]);
	return (
		<>
			<Carousel />
			<Featured />
		</>
	)
}

export default App