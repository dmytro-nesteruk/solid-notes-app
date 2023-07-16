import { Component, For, onMount } from 'solid-js';
import { createStore } from 'solid-js/store';

import { v4 as uuid } from 'uuid';

import { Card, CardProps } from '@components/index';
import { CardEntity, getRandomHexColor, getRandomPosition } from './shared';
import { HEADER_HEIGHT, LOCAL_STORAGE_KEYS } from '@shared/constants';

import s from './app.module.css';

// Generate new card with random background and position
const getRandomCard = (): CardEntity => ({
	text: '',
	id: uuid(),
	position: getRandomPosition(),
	background: getRandomHexColor(),
});

// Getting initial cards
const getInitialCards = (): Array<CardEntity> => {
	const cards = [getRandomCard()];

	try {
		const jsonString = localStorage.getItem(LOCAL_STORAGE_KEYS.CARDS);
		if (jsonString) {
			return JSON.parse(jsonString) as Array<CardEntity>;
		}

		return cards;
	} catch (error) {
		return cards;
	}
};

const App: Component = () => {
	const [cards, setCards] = createStore({ cards: getInitialCards() });

	// Add card handler
	const handleAddCard = () => {
		setCards('cards', (prev) => [...prev, getRandomCard()]);
	};

	// Update card handler
	const handleUpdate: CardProps['handleUpdate'] = (id, card) => {
		setCards('cards', (prev) => prev.id === id, card);
	};

	// Romove card handler
	const handleRemove: CardProps['handleRemove'] = (id) => {
		setCards('cards', (prev) => prev.filter((card) => card.id !== id));
	};

	// Window unload handler
	const handleWindowUnload = () => {
		try {
			localStorage.setItem(LOCAL_STORAGE_KEYS.CARDS, JSON.stringify(cards.cards));
		} catch (error) {
			console.error(error);
		}
	};

	onMount(() => {
		window.addEventListener('unload', handleWindowUnload);
	});

	return (
		<div>
			{/* Header */}
			<header class={s.header} style={{ height: `${HEADER_HEIGHT}px` }}>
				<button class={s.button} onClick={handleAddCard}>
					Add card
				</button>
			</header>

			{/* Content */}
			<div class={s.content} style={{ top: `${HEADER_HEIGHT}px` }}>
				<For each={cards.cards}>
					{(card, idx) => (
						<Card
							order={idx()}
							card={card}
							handleUpdate={handleUpdate}
							handleRemove={handleRemove}
						/>
					)}
				</For>
			</div>
		</div>
	);
};

export default App;
