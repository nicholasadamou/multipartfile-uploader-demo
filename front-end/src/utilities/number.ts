export const isFloat = (value: number) => {
	return Number.isFinite(value) && Math.floor(value) === value;
};

export const localeStringToNumber = (value: string) => {
	return Number.parseFloat(value.split(',').join(''));
};

export const inRange = (value: number, min: number, max: number) => {
	return value >= min && value <= max;
};

export const formateBytes = (bytes: number, decimals = 2) => {
	if (!+bytes) return '0B'

	const k = 1000
	const dm = decimals < 0 ? 0 : decimals
	const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

	const i = Math.floor(Math.log(bytes) / Math.log(k))

	return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))}${sizes[i]}`
}
