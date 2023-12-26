import React, { useEffect, useState } from 'react';
import MealItem from './MealItem';

const url = 'http://localhost:3000/meals';

const Meals = () => {
	const [loadedMeals, setLoadedMeals] = useState([]);
	const [isFetching, setIsFetching] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		const fetchMeals = async () => {
			try {
				setIsFetching(true);
				const res = await fetch(url, { method: 'GET' });
				if (!res.ok) {
					throw new Error(error);
				}
				const meals = await res.json();
				setLoadedMeals(meals);
			} catch (error) {
				console.log(error);
			}
		};
		fetchMeals();
		setIsFetching(false);
	}, []);

	return (
		<ul id='meals'>
			{loadedMeals.map(meal => {
				return <MealItem key={meal.id} {...meal} />;
			})}
		</ul>
	);
};

export default Meals;
