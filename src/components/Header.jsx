import React, { useContext } from 'react';
import logo from '../assets/logo.jpg';
import Button from './UI/button';
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';

const Header = () => {
	const { items } = useContext(CartContext);
	const { showCart } = useContext(UserProgressContext);

	const totalCartItems = items.reduce((totalNumberOfItems, item) => {
		return totalNumberOfItems + item.quantity;
	}, 0);

	const handleShowCart = () => {
		showCart();
	};

	return (
		<header id='main-header'>
			<div id='title'>
				<img src={logo} alt="restaurant's logo" />
				<h1>ReactFood</h1>
			</div>
			<nav>
				<Button textOnly onClick={handleShowCart}>
					Cart ({totalCartItems})
				</Button>
			</nav>
		</header>
	);
};

export default Header;
