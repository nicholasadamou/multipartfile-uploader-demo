import * as React from 'react';

import toast, { Toaster }  from 'react-hot-toast';

import { fetchDocuments, deleteDocument } from '@/api/document-api-service';

export const DocumentContext = React.createContext();

class DocumentProvider extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			documents: [],
			isLoading: true,
		}
	}

	componentDidMount = async () => {
		await this.fetchDocuments();
	}

	fetchDocuments = async () => {
		this.setState({
			isLoading: true
		});

		const { documents, status } = await fetchDocuments();

		if (status > 400) {
			toast.error('An error occurred while fetching documents.');

			this.setState({
				isLoading: false
			});

			return;
		}

		this.setState({
			documents,
			isLoading: false
		});
	}

	onDelete = async (target) => {
		if (target === null) {
			return;
		}

		const { documents } = this.state;

		const id = target.id;

		this.setState({
			isLoading: true,
		});

		const response = await deleteDocument(id);

		const { message, status } = response;

		if (status > 400) {
			toast.error(message);

			this.setState({
				isLoading: false
			});

			return;
		}

		const filteredDocuments = documents.filter(document => document.id !== id);

		this.setState({
			documents: [...filteredDocuments],
			isLoading: false
		});

		toast.success('Document deleted successfully.');
	}

	render() {
		const { children } = this.props;

		return (
			<DocumentContext.Provider value={{
				...this.state,
				fetchDocuments: this.fetchDocuments,
				onDelete: this.onDelete,
			}}>
				<Toaster />
				{children}
			</DocumentContext.Provider>
		);
	}
}

export default DocumentProvider;
