import React, { useReducer, createContext } from 'react';

const CartContext = createContext({
	items: [],
	addItem: item => {},
	removeItem: () => {},
	clearCart: () => {},
});

const cartReducer = (state, action) => {
	if (action.type === 'ADD_ITEM') {
		const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);

		const updatedItems = [...state.items];
		const existingItem = state.items[existingCartItemIndex];

		if (existingCartItemIndex !== -1) {
			// gdy jest już jakiś item w tablicy, to uaktyalniamy w nim dane i zwiększamy ilość
			const updatedItem = {
				...existingItem,
				quantity: existingItem.quantity + 1,
			};
			updatedItems[existingCartItemIndex] = updatedItem;
			// uaktualniamy dany item w tablicy items
		} else {
			updatedItems.push({ ...action.item, quantity: 1 });
			//dodajemy item do carty jeśli go tam nie ma i ustawiamy ilość na jeden
		}

		return { ...state, items: updatedItems };
		// zwracamy stan który się nie zmienia i aktualizujemy o te rzeczy które się zmieniły
	}

	if (action.type === 'REMOVE_ITEM') {
		const existingCartItemIndex = state.items.findIndex(item => item.id === action.id);
		const existingCartItem = state.items[existingCartItemIndex];

		const updatedItems = [...state.items];
		if (existingCartItem.quantity === 1) {
			// jeśli jest tylko jeden item to usuwamy cały z carty
			updatedItems.splice(existingCartItemIndex, 1);
		} else {
			// jeśli jest więcej niż jeden item to zmniejszamy quantity na karcie o jeden
			const updatedItem = {
				...existingCartItem,
				quantity: existingCartItem.quantity - 1,
			};
			// aktualizujemy item o wybranym indeksie
			updatedItems[existingCartItemIndex] = updatedItem;
		}
		// zwracamy cały stan z wszystkimi itemsami
		return { ...state, items: updatedItems };
	}

	if (action.type === 'CLEAR_CART') {
		return { ...state, items: [] };
	}

	return state;
};

export const CartContextProvider = ({ children }) => {
	const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

	const addItem = item => {
		dispatchCartAction({ type: 'ADD_ITEM', item: item });
	};

	const removeItem = id => {
		dispatchCartAction({ type: 'REMOVE_ITEM', id: id });
	};

	const clearCart = () => {
		dispatchCartAction({ type: 'CLEAR_CART' });
	};

	const cartContext = {
		items: cart.items,
		addItem: addItem,
		removeItem: removeItem,
		clearCart: clearCart,
	};

	return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>;
};

export default CartContext;
