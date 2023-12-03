import styled from '@emotion/styled';
import { colors } from '../theme/colors';
import { Typography } from '@mui/material';
import { SvgLoader } from './svg-loader';
import { getFillClassName, pointerClassName } from '../utils';

const fillOutlineClassName = getFillClassName(colors.text.outline);

const Container = styled.div`
	border: 1px solid ${colors.text.secondary};
	height: 48px;
	padding: 12px;
	border-radius: 100px;

	display: flex;
	flex-direction: row;
	gap: 12px;
`;

interface Props {
	count: number;
	onChange: (value: number) => void;
}

export const Selector = (props: Props) => {
	const { count, onChange } = props;

	const onMinus = () => {
		if (count > 0) {
			onChange(count - 1);
		}
	};

	const onPlus = () => {
		onChange(count + 1);
	};

	return (
		<Container>
			<SvgLoader
				path='common/ic-minus'
				onClick={onMinus}
				className={count === 0 ? fillOutlineClassName : pointerClassName}
			/>
			<Typography>{count}</Typography>
			<SvgLoader
				path='common/ic-plus'
				onClick={onPlus}
				className={pointerClassName}
			/>
		</Container>
	);
};
