import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Button } from '../../ui';
import { Stack } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../const/routes';
import { object, string, TypeOf } from 'zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod';
import FormInput from '../../ui/forms/form-input';
import { useSignInMutation } from '../../store/api/authApi';
import { toast } from 'react-toastify';
import { getMessageFromError } from '../../utils/getMessageFromError';
import { batch } from 'react-redux';
import { objectHasProperty } from '../../utils/objectHasProperty';
import { useActions } from '../../store/hooks/hooks';

const formSchema = object({
	email: string().email('Некорректный формат'),
	password: string().min(4, 'Введите не менее 4 символов'),
});

type FormType = TypeOf<typeof formSchema>;

export const SignIn = () => {
	const [signInRequestFn, { isLoading }] = useSignInMutation();
	const navigate = useNavigate();
	const { state } = useLocation();
	const { setUser, setTokens } = useActions();

	const formMethods = useForm<FormType>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const { handleSubmit } = formMethods;

	const onSubmitHandler: SubmitHandler<FormType> = async (values: FormType) => {
		try {
			const response = await signInRequestFn(values).unwrap();
			toast.success('Вы успешно зарегистрированы! Войдите в систему');
			batch(() => {
				setUser(response.data);
				setTokens({ accessToken: response.token, refreshToken: '' });
			});

			const hasRedirectPath =
				objectHasProperty(state, 'from') && typeof state.from === 'string';
			const redirectPath = hasRedirectPath ? state.from : '/items';

			navigate(redirectPath);
		} catch (error) {
			toast.error(
				getMessageFromError(
					error,
					'Неизвестная ошибка при авторизации пользователя'
				)
			);
		}
	};

	const onClickRegister = () => {
		navigate(ROUTES.signUp);
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
						Вход
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
									name='password'
									label='Пароль'
									type='password'
									id='password'
									autoComplete='new-password'
								/>
							</Grid>
						</Grid>
						<Stack spacing={2} mt={3}>
							<Button
								loading={isLoading}
								type='submit'
								fullWidth
								variant='contained'>
								Войти
							</Button>
							<Button
								loading={isLoading}
								fullWidth
								variant='outlined'
								onClick={onClickRegister}>
								Зарегистрироваться
							</Button>
						</Stack>
					</Box>
				</Box>
			</Container>
		</FormProvider>
	);
};
