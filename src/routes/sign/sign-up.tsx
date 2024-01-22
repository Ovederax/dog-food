import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { colors } from '../../theme/colors';
import { Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../const/routes';
import { object, string, TypeOf } from 'zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod';
import FormInput from '../../ui/forms/form-input';
import { getMessageFromError } from '../../utils/getMessageFromError';
import { toast } from 'react-toastify';
import { useSignUpMutation } from '../../store/api/authApi';
import { Button } from '../../ui';

const formSchema = object({
	email: string().email('Некорректный формат'),
	group: string().min(4, 'Некорректный формат'),
	password: string().min(4, 'Введите не менее 4 символов'),
});

type FormType = TypeOf<typeof formSchema>;

export const SignUp = () => {
	const [signUpRequestFn, { isLoading }] = useSignUpMutation();
	const navigate = useNavigate();

	const formMethods = useForm<FormType>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			group: '',
			password: '',
		},
	});

	const { handleSubmit } = formMethods;

	const onSubmitHandler: SubmitHandler<FormType> = async (values: FormType) => {
		try {
			await signUpRequestFn(values).unwrap();
			toast.success('Вы успешно зарегистрированы! Войдите в систему');
			navigate(ROUTES.signIn);
		} catch (error) {
			toast.error(
				getMessageFromError(
					error,
					'Неизвестная ошибка при регистрации пользователя'
				)
			);
		}
	};

	const onClickLogin = () => {
		navigate(ROUTES.signIn);
	};

	return (
		<FormProvider {...formMethods}>
			<Container component='main' maxWidth='xs'>
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}>
					<Typography component='h1' variant='h5'>
						Регистрация
					</Typography>
					<Box
						component='form'
						noValidate
						onSubmit={handleSubmit(onSubmitHandler)}
						sx={{ mt: 3 }}>
						<Grid container spacing={2} mb={3}>
							<Grid item xs={12}>
								<FormInput
									required
									fullWidth
									id='email'
									label='Email'
									name='email'
									autoComplete='email'
								/>
							</Grid>
							<Grid item xs={12}>
								<FormInput
									required
									fullWidth
									id='group'
									label='Группа'
									name='group'
								/>
							</Grid>
							<Grid item xs={12}>
								<FormInput
									required
									fullWidth
									name='password'
									label='Пароль'
									type='password'
									id='password'
									autoComplete='new-password'
								/>
							</Grid>
						</Grid>
						<Typography variant='s1' color={colors.text.secondary}>
							Регистрируясь на сайте, вы соглашаетесь с нашими Правилами и
							Политикой конфиденциальности и соглашаетесь на информационную
							рассылку.
						</Typography>
						<Stack spacing={2} mt={3}>
							<Button
								type='submit'
								fullWidth
								variant='contained'
								loading={isLoading}>
								Зарегистрироваться
							</Button>
							<Button
								fullWidth
								variant='outlined'
								onClick={onClickLogin}
								loading={isLoading}>
								Войти
							</Button>
						</Stack>
					</Box>
				</Box>
			</Container>
		</FormProvider>
	);
};
