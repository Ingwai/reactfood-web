import React, { useContext } from 'react';
import Modal from './UI/Modal';
import CartContext from '../store/CartContext';
import { currencyFormatter } from '../util/formatting';
import Input from './UI/Input';
import Button from './UI/button';
import UserProgressContext from '../store/UserProgressContext';

const Checkout = () => {
	const { items } = useContext(CartContext);
	const { progress, hideCheckout } = useContext(UserProgressContext);

	const cartTotal = items.reduce((totalPrice, item) => {
		return totalPrice + item.quantity * item.price;
	}, 0);

	const handleClose = () => {
		hideCheckout();
	};

	const handleSubmit = e => {
		e.preventDefault();
		const fd = new FormData(e.target);
		const customerData = Object.fromEntries(fd.entries());

		fetch('http://localhost:3000/orders', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				order: {
					items: items,
					customer: customerData,
				},
			}),
		});
	};

	return (
		<Modal open={progress === 'checkout'} onClose={progress === 'checkout' ? handleClose : null}>
			<form onSubmit={handleSubmit}>
				<h2>Chckout</h2>
				<p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
				<Input label='Full Name' type='text' id='name' />
				<Input label='E-mail Address' type='email' id='email' />
				<Input label='Street' type='text' id='street' />
				<div className='control-row'>
					<Input label='Postal Code' type='text' id='postal-code' />
					<Input label='City' type='text' id='city' />
				</div>
				<p className='modal-actions'>
					<Button type='button' textOnly onClick={handleClose}>
						Close
					</Button>
					<Button>Submit Order</Button>
				</p>
			</form>
		</Modal>
	);
};

export default Checkout;