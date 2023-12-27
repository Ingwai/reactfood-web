import useHttp from '../hooks/useHttp';
import Error from './Error';
import MealItem from './MealItem';

const url = 'http://localhost:3000/meals';
const requestConfig = {};

const Meals = () => {
	const { data: loadedMeals, isLoading, error } = useHttp(url, requestConfig, []);

	if (isLoading) {
		return <p className='center'>Fetching meals...</p>;
	}

	if (error) {
		return <Error title='Failed to fetch meals' message={error} />;
	}

	return (
		<ul id='meals'>
			{loadedMeals.map(meal => {
				return <MealItem key={meal.id} {...meal} />;
			})}
		</ul>
	);
};

export default Meals;
