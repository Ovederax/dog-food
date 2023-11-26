import styled from '@emotion/styled';
import { colors } from '../../theme/colors';
import { PageContainer, SvgLoader } from '../../ui';
import { Logo } from '../logo';
import { Stack, Typography, Link, AppBar, Toolbar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { css } from '@emotion/css';
import { FooterLink } from './footer-link';
import { elevation3 } from '../../theme/elevation';
import {
	favoritesClassName,
	getSizeClassName,
	svgSize32ClassName,
} from '../../utils/svg-styles';

const Wrapper = styled.div`
	background: ${colors.primary.main};
	display: flex;
	width: 100%;
	justify-content: center;
	margin-top: 40px;
`;

const Container = styled(PageContainer)`
	padding: 20px 0 calc(12px + 64px);
	display: flex;
	flex-grow: 1;
`;

const MDContainer = styled(Container)`
	padding: 40px 16px;
`;

const socialClassName = css`
	& svg:not(:hover) path {
		fill: ${colors.text.secondary};
	}
`;

const socialLinks = [
	{
		path: 'social/logo-telegram',
		alt: 'Telegram',
		href: '1',
	},
	{
		path: 'social/logo-whatsapp',
		alt: 'Whatsapp',
		href: '2',
	},
	{
		path: 'social/logo-viber',
		alt: 'Viber',
		href: '3',
	},
	{
		path: 'social/logo-instagram',
		alt: 'Instagram',
		href: '4',
	},
	{
		path: 'social/logo-vk',
		alt: 'VKontakte',
		href: '5',
	},
];

export const Footer = () => {
	const theme = useTheme();
	const matchesDownMD = useMediaQuery(theme.breakpoints.down('md'));

	const socialElements = socialLinks.map((it) => (
		<Link key={it.href} href={it.href} sx={{ display: 'block', height: 24 }}>
			<SvgLoader path={it.path} alt={it.alt} className={socialClassName} />
		</Link>
	));

	const buttons = [
		{
			icon: 'common/ic-home',
			title: 'Главная',
			className: svgSize32ClassName,
		},
		{
			icon: 'common/ic-catalog',
			title: 'Каталог',
			className: svgSize32ClassName,
		},
		{
			icon: 'common/ic-cart',
			title: 'Корзина',
			className: svgSize32ClassName,
		},
		{
			icon: 'common/ic-favorites',
			title: 'Избранное',
			className: `${svgSize32ClassName} ${favoritesClassName}`,
		},
		{
			icon: 'special/ic-profile',
			title: 'Профиль',
			className: getSizeClassName(32),
		},
	];

	if (matchesDownMD) {
		return (
			<>
				<Wrapper>
					<Container
						direction='row'
						justifyContent='center'
						alignItems='center'>
						<Stack spacing={1.5} alignItems='center'>
							<Typography variant='p1' fontWeight={700}>
								Мы всегда на связи
							</Typography>

							<Stack spacing={0.5}>
								<Typography variant='h3'>8 (999) 00-00-00</Typography>
								<Typography variant='p2'>dogfood.ru@gmail.com</Typography>
							</Stack>

							<Stack direction='row' spacing={2.5}>
								{socialElements}
							</Stack>

							<Typography variant='s2' color={colors.text.main}>
								© «Интернет-магазин натуральных лакомств для собак HorDog.ru»
							</Typography>
						</Stack>
					</Container>
				</Wrapper>
				<AppBar
					position='fixed'
					sx={{
						top: 'auto',
						bottom: 0,
						backgroundColor: colors.primary.main,
						boxShadow: elevation3,
					}}>
					<Toolbar>
						<Stack
							direction='row'
							alignItems='center'
							spacing={4}
							justifyContent='center'
							sx={{ width: '100%' }}>
							{buttons.map((it) => (
								<Stack
									key={it.title}
									alignItems='center'
									justifyContent='center'
									spacing={0.5}>
									<SvgLoader path={it.icon} className={it.className} />
									<Typography variant='s1' color={colors.text.main}>
										{it.title}
									</Typography>
								</Stack>
							))}
						</Stack>
					</Toolbar>
				</AppBar>
			</>
		);
	}

	return (
		<Wrapper>
			<MDContainer direction='row' useFlexGap justifyContent='space-between'>
				<Stack height='100%' justifyContent='space-between'>
					<Logo />

					<Typography variant='s2' color={colors.text.main}>
						© «Интернет-магазин DogFood.ru»
					</Typography>
				</Stack>

				<Stack spacing={2.41625}>
					<FooterLink to='\'>Каталог</FooterLink>
					<FooterLink to='\'>Акции</FooterLink>
					<FooterLink to='\'>Новости</FooterLink>
					<FooterLink to='\'>Отзывы</FooterLink>
				</Stack>

				<Stack spacing={2.41625}>
					<FooterLink to='\'>Оплата и доставка</FooterLink>
					<FooterLink to='\'>Часто спрашивают</FooterLink>
					<FooterLink to='\'>Обратная связь</FooterLink>
					<FooterLink to='\'>Контакты</FooterLink>
				</Stack>

				<Stack spacing={2}>
					<Typography variant='p1' fontWeight={700}>
						Мы на связи
					</Typography>

					<Stack spacing={0.5}>
						<Typography variant='p1' fontWeight={700}>
							8 (999) 00-00-00
						</Typography>
						<Typography variant='s1' color={colors.text.main}>
							dogfood.ru@gmail.com
						</Typography>
					</Stack>

					<Stack direction='row' spacing={1.5}>
						{socialElements}
					</Stack>
				</Stack>
			</MDContainer>
		</Wrapper>
	);
};
