import styled from '@emotion/styled';
import { colors } from '../theme/colors';

export const CardBadge = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	color: ${colors.text.white};
	background: ${colors.custom.red};
	padding: 2px 8px;

	font-size: 1rem;
	line-height: 1.25rem;
	font-weight: 800;

	border-radius: 20px;
	min-height: 24px;
	min-width: 58px;
	display: flex;
	justify-content: center;
	align-items: center;
`;
