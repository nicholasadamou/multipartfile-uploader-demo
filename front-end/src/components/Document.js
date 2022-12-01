class Document {
	static uploadURL = '/api/upload';

	request: XMLHttpRequest;

	file: File;

	document: JSON;

	constructor(file: File, document: JSON) {
		this.request = new XMLHttpRequest();
		this.request.overrideMimeType('application/json');

		this.file = file;
		this.document = document;
	}

	upload = async (onSuccess: function, onError: function) => {
		this.request.open('POST', Document.uploadURL, true);

		this.request.onload = () => {
			const response = JSON.parse(this.request.response);
			const {status} = response;

			if (status > 400) {
				onError(this.request);

				this.request.abort();

				return;
			}

			onSuccess();
		}

		let formData = new FormData();

		const document = new Blob([JSON.stringify(this.document), { type: 'application/json' }])

		formData.append('file', this.file);
		formData.append('document', document);

		this.request.send(formData);
	}
}

export default Document;
