import React, { useContext } from 'react';
import { currencyFormatter } from '../util/formatting.js';
import Button from './UI/button.jsx';
import CartContext from '../store/CartContext.jsx';

const MealItem = ({ image, name, description, price, id }) => {
	const { addItem } = useContext(CartContext);

	const meal = { image, name, description, price, id };

	const handleAddMealToCart = () => {
		addItem(meal);
	};

	return (
		<li className='meal-item'>
			<article>
				<img src={`http://localhost:3000/${image}`} alt={name} />
				<div>
					<h3>{name}</h3>
					<p className='meal-item-price'>{currencyFormatter.format(price)}</p>
					<p className='meal-item-description'>{description}</p>
				</div>
				<p className='meal-item-actions'>
					<Button onClick={handleAddMealToCart}>Add to Cart</Button>
				</p>
			</article>
		</li>
	);
};

export default MealItem;
