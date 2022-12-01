import React from 'react';

import styled from 'styled-components';

import DocumentProvider from '@/contexts/DocumentContext';

import DocumentsTable from '@/components/DocumentsTable';
import FileUploader from '@/components/FileUploader';

const Container = styled.div`
	display: grid;
	place-content: center;

	height: 40vh;
`;

const Documents = () => {
	const mode = localStorage.getItem('mode') || 'edit';

	localStorage.setItem('mode', mode);

	const isEditPage = mode === 'edit';
	const isViewPage = mode === 'view';

	return (
		<DocumentProvider>
			<Container>
				<DocumentsTable
					isEditPage={isEditPage}
					isViewPage={isViewPage}
				/>
				<FileUploader />
			</Container>
		</DocumentProvider>
	);
};

export default Documents;
