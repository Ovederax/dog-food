import styled from '@emotion/styled';
import { colors } from '../theme/colors';
import { SvgLoader } from '../ui';

const Container = styled('div')<{ redFill: boolean }>(({ redFill }) => {
	const base = `
    position: absolute;
    top: 0;
    right: 0;
    & svg path {
      cursor: pointer;
    }
  `;

	if (redFill) {
		return `
      ${base}
      & svg path {
        fill: ${colors.custom.red};
      }
    `;
	}

	return `
		${base}
		& svg path:first-child {
		  fill: ${colors.text.secondary};
		}
		& svg path:last-child {
		  ${redFill ? `fill: ${colors.custom.red}` : ''};
		}
	`;
});

interface Props {
	icon: string;
	redFill?: boolean;
	onClick: () => void;
}

export const FavButton = (props: Props) => {
	const { redFill = false, onClick, icon } = props;
	return (
		<Container onClick={onClick} redFill={redFill}>
			<SvgLoader path={icon} alt='DogFood' />
		</Container>
	);
};
