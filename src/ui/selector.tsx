import styled from '@emotion/styled';
import { colors } from '../theme/colors';
import { Typography } from '@mui/material';
import { SvgLoader } from './svg-loader';
import {
	getFillClassName,
	pointerClassName,
	svgSize20ClassName,
	svgSize24ClassName,
} from '../utils';

const fillOutlineClassName = getFillClassName(colors.text.outline);

const Container = styled.div<{ size: SelectorSize }>(
	({ size }) => `
	border: 1px solid ${colors.text.outline};
	height: ${size === SelectorSize.Big ? 48 : 36}px;
	padding: ${size === SelectorSize.Big ? 12 : 7}px;
	border-radius: 100px;

	display: flex;
	flex-direction: row;
	gap: 12px;
`
);

export enum SelectorSize {
	Big,
	Small,
}

interface Props {
	min?: number;
	max?: number;
	count: number;
	onChange: (value: number) => void;
	size?: SelectorSize;
}

export const Selector = (props: Props) => {
	const { count, onChange, size = SelectorSize.Big, min = 0, max } = props;

	const sizeClassName =
		size === SelectorSize.Big ? svgSize24ClassName : svgSize20ClassName;

	const onMinus = () => {
		if (count - 1 < min) {
			return;
		}
		if (count > 0) {
			onChange(count - 1);
		}
	};

	const onPlus = () => {
		if (max !== undefined && count + 1 > max) {
			return;
		}
		onChange(count + 1);
	};

	return (
		<Container size={size}>
			<SvgLoader
				path='common/ic-minus'
				onClick={onMinus}
				className={[
					count === min ? fillOutlineClassName : pointerClassName,
					sizeClassName,
				]}
			/>
			<Typography
				lineHeight={'1.25rem'}
				fontSize={size === SelectorSize.Big ? '21px' : '1rem'}
				fontWeight={700}>
				{count}
			</Typography>
			<SvgLoader
				path='common/ic-plus'
				onClick={onPlus}
				className={[
					count === max ? fillOutlineClassName : pointerClassName,
					sizeClassName,
				]}
			/>
		</Container>
	);
};
