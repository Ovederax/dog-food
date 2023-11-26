import { createTheme, Components } from '@mui/material';
import { colors } from './colors';

const fontFamily = "'Nunito', sans-serif";

const typography = {
	h0: {
		fontSize: '3rem',
		lineHeight: '3.25‬rem',
		color: colors.text.main,
		fontWeight: 900,
		fontFamily,
	},
	h1: {
		fontSize: '1.75rem',
		lineHeight: '2rem',
		color: colors.text.main,
		fontWeight: 800,
		fontFamily,
	},
	h2: {
		fontSize: '1.5rem',
		lineHeight: '1.75‬rem',
		color: colors.text.main,
		fontWeight: 800,
		fontFamily,
	},
	h3: {
		fontSize: '1.25rem',
		lineHeight: '1.5rem',
		color: colors.text.main,
		fontWeight: 800,
		fontFamily,
	},
	p1: {
		fontSize: '1rem',
		lineHeight: '1.25rem',
		color: colors.text.main,
		fontWeight: 400,
		fontFamily,
	},
	p2: {
		fontSize: '0.875rem',
		lineHeight: '1.25rem',
		color: colors.text.main,
		fontWeight: 400,
		fontFamily,
	},
	s1: {
		fontSize: '0.75rem',
		lineHeight: '0.875rem',
		color: colors.text.secondary,
		fontWeight: 400,
		fontFamily,
	},
	s2: {
		fontSize: '0.5625rem',
		lineHeight: '0.75rem',
		color: colors.text.secondary,
		fontWeight: 400,
		fontFamily,
	},
};

const MuiTypography = {
	defaultProps: {
		variantMapping: {
			h0: 'h1',
			s1: 'span',
			s2: 'span',
			p1: 'p',
			p2: 'p',
		},
	},
} as Components['MuiTypography'];

const MuiSelect: Components['MuiSelect'] = {
	styleOverrides: {
		root: {
			'& fieldset': {
				borderColor: colors.primary.main,
			},
			'&:hover fieldset': {
				borderColor: `${colors.primary.darker} !important`,
			},
			'&.Mui-focused fieldset': {
				borderColor: `${colors.primary.main} !important`,
			},
		},
	},
};

const MuiLink: Components['MuiLink'] = {
	styleOverrides: {
		root: {
			'&:focus': {
				outline: `solid ${colors.primary.darker}`,
			},
		},
	},
};

export const theme = createTheme({
	typography,
	components: {
		MuiTypography,
		MuiSelect,
		MuiLink,
	},
});
