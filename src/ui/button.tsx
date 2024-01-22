import { Button as MuiButton, SxProps, Theme } from '@mui/material';
import styled from '@emotion/styled';
import { colors } from '../theme/colors';
import { Spinner } from './spinner';

interface Props {
	children: React.ReactNode | string;
	variant?: 'outlined' | 'contained';
	sx?: SxProps<Theme>;
	onClick?: () => void;
	type?: 'submit';
	fullWidth?: boolean;
	loading?: boolean;
}

type ButtonStyledProps = Pick<Props, 'variant'>;

const ButtonStyled = styled(MuiButton)<ButtonStyledProps>(
	({ variant }: ButtonStyledProps) => `
		display: block;
		${variant === 'contained' ? `background: ${colors.primary.main};` : ''}
		border-color: ${colors.text.outline};
		color: ${colors.text.main};
		text-transform: unset;

		&:hover {
			background: ${colors.primary.darker};
			border-color: ${colors.primary.darker};
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
	const {
		children,
		variant = 'contained',
		sx,
		onClick,
		type,
		fullWidth,
		loading,
	} = props;
	return (
		<ButtonStyled
			variant={variant}
			sx={sx}
			onClick={onClick}
			type={type}
			fullWidth={fullWidth}
			disabled={loading}>
			{loading ? <Spinner size='1.5rem' /> : children}
		</ButtonStyled>
	);
};
