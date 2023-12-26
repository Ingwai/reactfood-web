import React, { useContext } from 'react';
import CartContext from '../store/CartContext';
import { currencyFormatter } from '../util/formatting';
import Button from './UI/button';
import UserProgressContext from '../store/UserProgressContext';
import Modal from './UI/Modal';
import CartItem from './CartItem';

const Cart = () => {
	const { items, addItem, removeItem } = useContext(CartContext);
	const { progress, hideCart, showCheckout } = useContext(UserProgressContext);

	const cartTotal = items.reduce((totalPrice, item) => {
		return totalPrice + item.quantity * item.price;
	}, 0);

	const handleCloseCart = () => {
		hideCart();
	};

	const handleGoToCheckout = () => {
		showCheckout();
	};

	return (
		<Modal className='cart' open={progress === 'cart'} onClose={progress === 'cart' ? handleCloseCart : null}>
			<h2>Your Cart</h2>
			<ul>
				{items.map(item => (
					<CartItem key={item.id} {...item} onIncrease={() => addItem(item)} onDecrease={() => removeItem(item.id)} />
				))}
			</ul>
			<p className='cart-total'>{currencyFormatter.format(cartTotal)}</p>
			<p className='modal-actions'>
				<Button textOnly onClick={handleCloseCart}>
					Close
				</Button>
				{items.length > 0 && <Button onClick={handleGoToCheckout}>Go to Checkout</Button>}
			</p>
		</Modal>
	);
};

export default Cart;
