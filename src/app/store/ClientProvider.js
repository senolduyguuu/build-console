"use client";

import { Provider } from 'react-redux';
import { store } from '../store/index';

export default function ClientProvider({ children }) {
	return (
		<Provider store={store}>
			{children}
		</Provider>
	);
}
