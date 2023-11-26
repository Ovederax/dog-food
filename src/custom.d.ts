import { TypographyPropsVariantOverrides } from '@mui/material/Typography/Typography';

export type TypographyPropsVariantOverridesCustom =
	TypographyPropsVariantOverrides;

declare module '*.svg' {
	import React = require('react');
	export const ReactComponent: React.FunctionComponent<
		React.SVGProps<SVGSVGElement>
	>;
	const src: string;
	export default src;
}
declare module '*.png' {
	const content: unknown;
	export default content;
}
declare module '*.jpg' {
	const content: unknown;
	export default content;
}
declare module '*.json' {
	const content: unknown;
	export default content;
}

declare module '*.module.css' {
	const classes: { [key: string]: string };
	export default classes;
}

declare module '*.module.scss' {
	const classes: { [key: string]: string };
	export default classes;
}

declare module '*.module.sass' {
	const classes: { [key: string]: string };
	export default classes;
}

declare module '@mui/material/Typography' {
	interface TypographyPropsVariantOverrides {
		p1: true;
		p2: true;
		s1: true;
		s2: true;
	}
}
