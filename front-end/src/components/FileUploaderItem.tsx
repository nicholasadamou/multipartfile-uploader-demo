import {
	FileUploaderItem as CarbonFileUploaderItem,
	FileUploaderItemProps as CarbonFileUploaderItemProps,
} from 'carbon-components-react';

export type FileUploaderItemProps = CarbonFileUploaderItemProps & {
	file: File;
	filesize: number;
	invalidFileType?: boolean;
};

export const FileUploaderItem = ({ ...props }: FileUploaderItemProps) => {

	const { file, filesize, invalidFileType, ...rest } = props;

	return (
		<CarbonFileUploaderItem
			{...rest}
		/>
	);
};
