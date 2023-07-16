const getRandomHexadecimal = () => Math.ceil(Math.random() * 255).toString(16);

export const getRandomHexColor = (): string => {
	const hex = [0, 0, 0].map(getRandomHexadecimal).join('');

	return `#${hex}`;
};
