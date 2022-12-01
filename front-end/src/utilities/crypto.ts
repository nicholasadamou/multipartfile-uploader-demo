import { isBrowser } from './misc';

const errorMessage = 'Not in the browser!';

export const getArrayOfRandomNumbers = (max = 1) => {
	if (isBrowser) {
		const array = new Uint32Array(max);
		return window.crypto.getRandomValues(array);
	} else {
		throw errorMessage;
	}
};

export const getRandomNumber = () => {
	if (isBrowser) {
		const array = new Uint32Array(1);
		return window.crypto.getRandomValues(array)[0];
	} else {
		throw errorMessage;
	}
};

export const getUUID = () => {
	if (isBrowser) {
		return window.crypto.randomUUID();
	} else {
		throw errorMessage;
	}
};
