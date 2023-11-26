import MuiButton from '@mui/material/Button';
import styled from '@emotion/styled';
import { colors } from '../theme/colors';

interface Props {
	children: React.ReactElement | string;
	variant?: 'outlined' | 'contained';
}

type ButtonStyledProps = Pick<Props, 'variant'>;

const ButtonStyled = styled(MuiButton)<ButtonStyledProps>(
	({ variant }: ButtonStyledProps) => `
		${variant === 'contained' ? `background: ${colors.primary.main};` : ''}
		color: ${colors.text.main};
		text-transform: unset;

		&:hover {
			background: ${colors.primary.darker};
		}

		font-size: 1rem;
		line-height: 1.25rem;
		font-weight: 700;
		border-radius: 55px;
		box-shadow: none;
		padding: 10px 18px;
	`
);

export const Button = (props: Props) => {
	const { children, variant = 'contained' } = props;
	return <ButtonStyled variant={variant}>{children}</ButtonStyled>;
};
