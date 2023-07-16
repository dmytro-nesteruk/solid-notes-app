import { HEADER_HEIGHT } from '@shared/constants';
import { Position } from '../interfaces/position';

export const getRandomPosition = (squareSize = 300): Position => {
	const x = Math.random() * window.innerWidth;
	const y = Math.random() * window.innerHeight;

	const minX = x - squareSize;
	const minY = y - squareSize;

	return {
		x: minX < 0 ? 0 : minX,
		y: minY < HEADER_HEIGHT ? HEADER_HEIGHT + 10 : minY,
	};
};
