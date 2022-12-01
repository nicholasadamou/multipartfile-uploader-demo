export const truncateString = (str: string, limit: number) => {
	if (str.length > limit) {
		return `${str.substring(0, limit)}...`;
	} else {
		return str;
	}
}

export const getFileBaseName = (fileName: string) => {
	return fileName.substring(0, fileName.lastIndexOf('.')) || fileName;
}

export const getFileExtension = (fileName: string) => {
	return fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length) || '';
}

export const truncateFileName = (fileName: string, limit = 40) => {
	const fileExtension = getFileExtension(fileName);
	const fileBaseName = getFileBaseName(fileName);
	const truncatedBaseName = truncateString(fileBaseName, limit);
	return `${truncatedBaseName}.${fileExtension}`;
}
