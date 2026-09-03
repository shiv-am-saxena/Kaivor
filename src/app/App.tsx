import React, { useEffect } from 'react'
import AnnouncementBar from '../components/homepage/AnnouncementBar'
import res from "../data/const.json";
import { useAppDispatch } from '../context/hooks';
import { setData } from '../context/slices/homepage.slice';
const App = () => {
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(setData(res.data.data));
	}, [dispatch]);
	return (
		<AnnouncementBar />
	)
}

export default App