import { Component, JSX } from 'solid-js';

import { CardEntity, Position } from '@shared/interfaces';

import s from './card.module.css';
import { CARD_CROSS_SIZE, HEADER_HEIGHT } from '@shared/constants';

export interface CardProps {
	handleUpdate: (id: CardEntity['id'], card: Partial<CardEntity>) => void;
	handleRemove: (id: CardEntity['id']) => void;
	card: CardEntity;
	order: number;
}

export const Card: Component<CardProps> = (props) => {
	// Card ref
	let ref: HTMLButtonElement | undefined = undefined;

	// Offset ref
	let offset: Position | null;

	// Mouse move handler
	const handleMouseMove = (e: MouseEvent) => {
		if (!offset) return;

		let x = e.clientX - offset.x;
		let y = e.clientY - offset.y;

		// Reasigning "x" and "y" when it smaller than 0
		x < 0 && (x = 0);
		y < 0 && (y = 0);

		if (ref) {
			const isMaxX = x + ref.clientWidth >= window.innerWidth;
			const isMaxY = y + ref.clientHeight >= window.innerHeight - HEADER_HEIGHT;

			// Reasigning "x" and "y" when it bigger than max possible view size
			isMaxX && (x = window.innerWidth - ref.clientWidth - CARD_CROSS_SIZE);
			isMaxY && (y = window.innerHeight - ref.clientHeight - HEADER_HEIGHT);
		}

		props.handleUpdate(props.card.id, { position: { x, y } });
	};

	// Mouse down handler
	const handleMouseDown = (e: MouseEvent) => {
		e.stopPropagation();

		if (!ref) return;

		offset = { x: e.offsetX, y: e.offsetY + HEADER_HEIGHT };

		// Changing cursor style before "mousedown" event
		ref.style.cursor = 'grab';

		ref.addEventListener('mousemove', handleMouseMove);
	};

	// Mouse up handler
	const handleMouseUp = () => {
		if (!ref) return;

		offset = null;

		// Changing cursor style after "mouseup" event
		ref.style.cursor = 'default';

		ref.removeEventListener('mousemove', handleMouseMove);
	};

	// Input handler
	const handleTextChange: JSX.InputEventHandlerUnion<HTMLTextAreaElement, InputEvent> = (e) => {
		props.handleUpdate(props.card.id, {
			text: e.target.value,
		});
	};

	return (
		<div
			class={s.root}
			style={{
				'z-index': props.order + 1,
				transform: `translate(${props.card.position.x}px, ${props.card.position.y}px)`,
			}}
		>
			{/* Text input */}
			<textarea
				placeholder="Type your text here"
				class={s.textarea}
				ref={ref}
				value={props.card.text}
				onInput={handleTextChange}
				onMouseDown={handleMouseDown}
				onMouseUp={handleMouseUp}
				style={{
					'background-color': props.card.background,
				}}
			/>

			{/* Remove card button */}
			<button
				class={s.cross}
				style={{
					height: `${CARD_CROSS_SIZE}px`,
					width: `${CARD_CROSS_SIZE}px`,
				}}
				onClick={() => props.handleRemove(props.card.id)}
			>
				&times
			</button>
		</div>
	);
};
