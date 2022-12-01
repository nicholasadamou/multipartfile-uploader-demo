import axios from 'axios';

import { Document } from '@/types/Document';

const BASE_URL = `/api/document`;

export const fetchDocuments = async () => {
	  let response;

	  try {
		  response =  await axios.get(`${BASE_URL}/`);
	  } catch (error: any | unknown) {
		  console.error(error.toString());

		  return error.response;
	  }

	  return {
		  // @ts-ignore
		  documents: response.data.entity,
		  status: response.data.status
	  }
}

export const uploadDocument = async (file: File, document: Document) => {
	const formData = new FormData();

	// @ts-ignore
	delete document.id;

	const documentBlob = new Blob([JSON.stringify(document)], { type: 'application/json' });

	formData.append('file', file);
	formData.append('document', documentBlob);

	let response;

	try {
		response = await axios.post(`${BASE_URL}/`, formData);
	} catch (error: any | unknown) {
		console.error(error.toString());

		return error.response;
	}

	return {
		...response,
		status: response.status
	}
}

export const deleteDocument = async (id: number) => {
	let response;

	try {
		response = await axios.delete(`${BASE_URL}/${id}`);
	} catch (error: any | unknown) {
		console.error(error.toString());

		return error.response;
	}

	return {
		...response,
		status: response.status
	}
}

export const getDocument = async (id: number) => {
	let response;

	try {
		response =  await axios.get(`${BASE_URL}/${id}`);
	} catch (error: any | unknown) {
		console.error(error.toString());

		return error.response;
	}

	return {
		// @ts-ignore
		document: response.data.entity,
		status: response.data.status
	}
}
