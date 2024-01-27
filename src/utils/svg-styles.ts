import { css } from '@emotion/css';
import { colors } from '../theme/colors';

export const getSizeClassName = (size: number) => css`
	svg {
		width: ${size}px;
		height: ${size}px;
	}
`;

export const getFillClassName = (fill: string) => css`
	svg path {
		fill: ${fill};
	}
`;

export const favoritesClassName = css`
	& svg path:last-child {
		fill: transparent;
	}
`;

export const pointerClassName = css`
	& svg {
		cursor: pointer;
	}
`;

export const svgSize32ClassName = getSizeClassName(32);

export const svgSize24ClassName = getSizeClassName(24);

export const svgSize20ClassName = getSizeClassName(20);

export const svgSize16ClassName = getSizeClassName(16);

export const svgFillSecondaryClassName = getFillClassName(
	colors.text.secondary
);
