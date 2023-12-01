import { ReactSVG } from 'react-svg';

interface Props {
	path: string;
	alt?: string;
	display?: 'block' | 'inline-block';
	className?: string;
}

export const SvgLoader = (props: Props) => {
	const { path, display, className } = props;
	const src = '/../../static/icons/' + path + '.svg';

	return <ReactSVG src={src} className={className} style={{ display }} />;
};
