import { css } from '@emotion/css';

export const getSizeClassName = (size: number) => css`
	svg {
		width: ${size}px;
		height: ${size}px;
	}
`;

export const favoritesClassName = css`
	& svg path:last-child {
		fill: transparent;
	}
`;

export const svgSize32ClassName = getSizeClassName(32);
