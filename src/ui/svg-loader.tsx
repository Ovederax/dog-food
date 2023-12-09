import { ReactSVG } from 'react-svg';

interface Props {
	path: string;
	alt?: string;
	display?: 'block' | 'inline-block';
	className?: string | string[];
	onClick?: () => void;
}

export const SvgLoader = (props: Props) => {
	const { path, display, className, onClick } = props;
	const src = '/../../static/icons/' + path + '.svg';

	const classNameStr =
		typeof className === 'object' ? className.join(' ') : className;

	return (
		<ReactSVG
			src={src}
			className={classNameStr}
			style={{ display }}
			onClick={onClick}
		/>
	);
};
