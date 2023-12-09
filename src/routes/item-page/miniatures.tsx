import { Stack } from '@mui/material';
import styled from '@emotion/styled';

const MiniImg = styled.img`
	background: #ddd;
	display: block;
	width: 80px;
	height: 80px;
	min-height: 80px;
	border-radius: 13.33px;
	box-shadow: 0 2px 16px 0 #60617029, 0 0 1px 0 #28293d05;
`;

interface Props {
	images: string[];
}

export const Miniatures = (props: Props) => {
	const { images } = props;

	return (
		<Stack>
			{images.map((it) => (
				<MiniImg key={it} src={it} />
			))}
		</Stack>
	);
};
