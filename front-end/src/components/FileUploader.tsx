import * as React from 'react';

import styled from 'styled-components';

import {
	FileUploaderDropContainer,
	FileUploaderSkeleton,
	Form,
} from 'carbon-components-react';

import { uploadDocument } from '@/api/document-api-service';

import { getUUID } from '@/utilities/crypto';
import { formateBytes } from '@/utilities/number';
import { truncateFileName } from '@/utilities/string';

import { Document } from '@/types/Document';

import { DocumentContext }  from '@/contexts/DocumentContext';

import {
	FileUploaderItem,
	FileUploaderItemProps,
} from './FileUploaderItem';

const StyledForm = styled(Form)`
  padding-top: 30px;

  .bx--form-item {
    padding-bottom: 30px;
  }
  .bx--file-browse-btn {
    max-width: 100%;
  }
  .bx--file__selected-file {
    max-width: 100%;
  }
`;

const validTypes = [
	'.csv',
	'.doc',
	'.docx',
	'.pdf',
	'.ppt',
	'.pptx',
	'.print',
	'.txt',
	'.xlsb',
	'.xlsm',
	'.xlsx',
	'.zip',
];

const maxFileSize = 6000000; // 6MB

const uid = (prefix = 'id') => {
	return `${prefix}-${getUUID()}`;
};

const FileUploader = ({ ...props }) => {
	const {
		fetchDocuments,
		isLoading
	} = React.useContext(DocumentContext);

	const [files, setFiles] = React.useState<FileUploaderItemProps[]>([]);
	const [document, setDocument] = React.useState<Document>({
		id: '',
		name: '',
		size: 0,
		type: ''
	});

	const uploadFile = React.useCallback(
		async (fileToUpload: FileUploaderItemProps) => {
			if (fileToUpload.filesize > maxFileSize) {
				const updatedFile: FileUploaderItemProps = {
					...fileToUpload,
					status: 'edit',
					iconDescription: 'Delete file',
					invalid: true,
					errorSubject: 'File size exceeds limit',
					errorBody: `${formateBytes(maxFileSize)} max file size. Select a new file and try again.`,
				};

				setFiles((files) =>
					files.map((file) =>
						file.uuid === fileToUpload.uuid ? updatedFile : file
					)
				);

				return;
			}

			if (fileToUpload.invalidFileType) {
				const updatedFile: FileUploaderItemProps = {
					...fileToUpload,
					status: 'edit',
					iconDescription: 'Delete file',
					invalid: true,
					errorSubject: 'Invalid file type',
					errorBody: `"${fileToUpload.name}" does not have a valid file type.`,
				};

				setFiles((files) =>
					files.map((file) =>
						file.uuid === fileToUpload.uuid ? updatedFile : file
					)
				);

				return;
			}

			const response = await uploadDocument(fileToUpload.file, document);

			const { status }  = response;

			if (status !== 200) {
				const updatedFile: FileUploaderItemProps = {
					...fileToUpload,
					status: 'edit',
					iconDescription: 'Delete file',
					invalid: true,
					errorSubject: 'Upload failed',
					errorBody: `${response.data}`,
				};

				setFiles((files) =>
					files.map((file) =>
						file.uuid === fileToUpload.uuid ? updatedFile : file
					)
				);

				return;
			}

			const updatedFile: FileUploaderItemProps = {
				...fileToUpload,
				status: 'complete',
				iconDescription: 'Upload complete',
			};

			setFiles((files) =>
				files.map((file) =>
					file.uuid === fileToUpload.uuid ? updatedFile : file
				)
			);
		},
	[document]);


	const onAddFiles = React.useCallback(
		(event: React.DragEvent<HTMLDivElement>, { addedFiles }: any) => {
			setDocument({
				id: uid(),
				name: addedFiles[0].name,
				size: addedFiles[0].size,
				type: addedFiles[0].type,
			});

			event.stopPropagation();

			const newFiles = addedFiles.map((file: FileUploaderItemProps) => {
				const fileName = file.name ? truncateFileName(file.name, 40) : '';

				return ({
					uuid: uid(),
					name: fileName,
					filesize: file.size,
					status: 'uploading',
					iconDescription: 'Uploading',
					invalidFileType: file.invalidFileType,
					file,
				});
			});

			setFiles([...files, ...newFiles]);

			const pa = Promise.all(newFiles.map((file: FileUploaderItemProps) => uploadFile(file)));

			pa.then(() => {
				setTimeout(() => {
					const completedFiles = (files: FileUploaderItemProps[]) => files.filter((file) => file.status === 'complete');

					if (completedFiles.length > 0) {
						fetchDocuments();
					}

					setFiles((files) => files.filter((file) => file.status !== 'complete'));
				}, 1000);
			});
		},
		[fetchDocuments, files, uploadFile],
	);

	const handleFileUploaderItemClick = React.useCallback(
		(_: any, { uuid: clickedUuid }: any) =>
			setFiles(files.filter(({ uuid }) => clickedUuid !== uuid)),
		[files],
	);

	if (isLoading && files.length === 0) {
		return (
			<StyledForm>
				<FileUploaderSkeleton />
			</StyledForm>
		);
	}

	return (
		<StyledForm>
			<p className={'bx--file--label'}>Add more documents</p>
			<p className={'bx--label-description'}>
				Max file size is {formateBytes(maxFileSize)}.
				Supported file types are .xlsx, .xlsm, .xlsb, .zip, .doc, .docx, .ppt, .pptx, .txt, .pdf, .csv, .print.
			</p>
			<FileUploaderDropContainer
				labelText='Choose a file or drag and drop it here'
				multiple
				name='supporting-documentation-file-uploader'
				accept={validTypes}
				onAddFiles={onAddFiles}
			/>
			<div className={'bx--file-container'} style={{ width: '100%' }}>
				{files.map((file) => (
						file.invalid ? (
							<FileUploaderItem
								key={uid()}
								uuid={file.uuid}

								name={file.name}
								size='lg'


								status={file.status}
								iconDescription={file.iconDescription}

								invalid
								errorSubject={file.errorSubject}
								errorBody={file.errorBody}

								onDelete={handleFileUploaderItemClick}

								{...file}
							/>
						) : (
							<FileUploaderItem
								key={uid()}
								uuid={file.uuid}

								name={file.name}

								size='lg'

								status={file.status}

								iconDescription={file.iconDescription}

								onDelete={handleFileUploaderItemClick}

								{...file}
							/>
						)
					)
				)}
			</div>
		</StyledForm>
	);

};

export default FileUploader;
