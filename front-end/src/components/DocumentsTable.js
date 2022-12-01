import * as React from 'react';

import styled from 'styled-components';

import FileDownload from 'js-file-download';

import toast from 'react-hot-toast';

import {DataTable, DataTableSkeleton} from "carbon-components-react";

import Delete from '@carbon/icons-react/es/delete/16';

import { DocumentContext } from '@/contexts/DocumentContext';

import { getDocument } from '@/api/document-api-service';

import { convertDate } from '@/utilities/date';

import { edit, view } from './data';

const { TableContainer, Table, TableHead, TableRow, TableBody, TableCell, TableHeader } = DataTable;

const Container = styled.div`
  min-width: 100%;
  max-width: 100%;
  #section-header {
    margin-bottom: 20px;
  }
  .tableContainer {
    overflow-x: unset !important;
    .bx--data-table--compact tbody tr {
      height: 2.5rem;
    }
	.view-only-header {
	  font-weight: 600;
	  background-color: transparent;
	  border-bottom: 1px solid #989898 !important;
	  & > * {
		font-size: smaller !important;
		text-align: left;
	  }
	  .bx--table-header-label {
		background-color: #e0e0e0;
		color: var(--table-header-color);
		font-weight: 400;
		font-size: 16px !important;
	  }
	}
    .tableHeader {
      padding: 0 !important;
      font-weight: 600;
      background-color: transparent;
	  border-bottom: 1px solid #989898 !important;
      & > * {
        font-size: smaller !important;
        text-align: left;
      }
      .bx--table-header-label {
        background-color: #e0e0e0;
		color: var(--table-header-color);
		font-weight: 400;
		font-size: 16px !important;
      }
    }
	.view-only-cell {
	  padding-left: 10px !important;
	  padding-bottom: 0 !important;
	  font-size: 16px !important;
	  text-align: left !important;
	  background-color: #f4f4f4;
	  border-top: none !important;
	}
    .cell {
      padding-left: 0 !important;
      padding-bottom: 0 !important;
      font-size: 16px !important;
      text-align: left !important;
	  border-top: none !important;
      background-color: #f4f4f4;
    }
    #error {
      font-size: 16px;
    }
  }
  .bx--data-table td {
    background-color: transparent !important;
	border-bottom: none;
  }
  .bx--data-table th {
    background-color: transparent!important;
    height: 2.5rem !important;
    padding-top: 8px !important;
    padding-left: 15px !important;
    font-size: 16px;
    font-weight: bold;
  }
  .bx--data-table td, .bx--data-table tbody th {
	border-top: 1px solid #989898;
  }
  .bx--data-table tbody tr:hover {
	background-color: transparent !important;
  }
  .bx--data-table tbody tr:hover td, .bx--data-table tbody tr:hover th {
	border-top: 1px solid #989898;
	border-bottom: none !important;
  }
  .bx--table-header-label {
    background-color: transparent !important;
  }
  .bx--data-table--compact tbody tr {
    height: 2.5rem;
  }
  .delete-btn-cell {
	padding-right: 0 !important;
	.delete-btn {
	  padding-left: 20px !important;
	  padding-right: 20px !important;
	  &:disabled {
		cursor: not-allowed;
		& > .delete-icon {
		  fill: #e0e0e0;
		}
	  }
	  & > .delete-icon {
		fill: #007bff;
		width: 18px;
		height: 18px;
		margin-bottom: -3px;
	  }
	}
  }
  a {
	color: #007bff;
  }
`;

const LinkButton = styled.button`
  background: none!important;
  border: none;
  padding: 0 !important;
  /*optional*/
  font-family: arial, sans-serif;
  font-size: 16px;
  /*input has OS specific font-family*/
  color: #007bff;
  text-decoration: underline;
  text-align: left;
  cursor: pointer;
  overflow-wrap: anywhere;
  &:hover {
	text-decoration: underline;
  }
`;

const NoData = styled.div`
	font-size: 16px;
`;

const DocumentsTable = (props) => {
	const {
		isEditPage,
		isViewPage,
	} = props;

	const { documents, onDelete, isLoading } = React.useContext(DocumentContext);

	const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	const formatDate = 'DD MMM YYYY hh:mm A';

	const onDownload = async (id, fileName) => {
		const toastId = toast.loading(`Downloading File ${fileName}.`, {
			style: {
				minWidth: 250
			}
		});

		const { document, status } = await getDocument(id);

		toast.dismiss(toastId);

		if (document === undefined || status > 400) {
			toast.error(`Unable to download file ${fileName}.`);

			return;
		}

		const buffer = Buffer.from(document.data, 'base64');

		FileDownload(buffer, fileName);
	}

	let headers;

	if (isEditPage) {
		headers = edit;
	} else {
		headers = view;
	}

	if (isLoading) {
		return (
			<DataTableSkeleton headers={headers} showHeader={false} showToolbar={false} />
		)
	}

	if (documents.length === 0) {
		return (
			<NoData>
				No documents found.
			</NoData>
		)
	}

	return (
		<Container>
			<DataTable
				rows={documents}
				headers={headers}
				isSortable={true}
				isSortHeader={true}
				useStaticWidth={true}
				size='xs'
				render={({ rows, headers }) => (
					<TableContainer className="tableContainer">
						<Table className="bx-data-table--compact" id="supportingDocuments">
							<TableHead>
								<TableRow>
									{headers.map(header => (
										<TableHeader key={header.key} className={`${isViewPage ? 'view-only-header' : 'tableHeader'}`}>
											{header.header}
										</TableHeader>
									))}
								</TableRow>
							</TableHead>
							<TableBody>
								{rows.map(row => (
									<TableRow key={row.id}>
										{row.cells.map(cell => {
											const document = documents.at(row);

											return (
												<TableCell key={cell.id} className={`${(cell.id.includes('actionRow')) ? 'delete-btn-cell' : ''} ${(isViewPage) ? 'view-only-cell' : 'cell'}`}>
													{cell.id.includes('uploadedOn')
														? convertDate(`${cell.value}`, timeZone, formatDate)
														: cell.id.includes('actionRow')
															? (
																<LinkButton
																	id={`${row.id}-delete-btn`}
																	className="delete-btn"
																	onClick={() => onDelete(
																		document
																	)}
																>
																	<Delete className="delete-icon" />
																</LinkButton>
															) : cell.id.includes('originalFileName')
																? (
																	<LinkButton
																		id={`${row.id}-download-btn`}
																		onClick={() => onDownload(
																			document.id,
																			document.originalFileName
																		)}
																	>
																		{cell.value}
																	</LinkButton>
																) : (
																	cell.value
																)
													}
												</TableCell>
											)
										})}
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				)}
			/>
		</Container>
	)
}

export default DocumentsTable;
