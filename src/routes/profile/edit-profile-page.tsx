import React from 'react';
import { Button } from '../../ui';
import { object, string, TypeOf } from 'zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod';
import { Grid } from '@mui/material';
import FormInput from '../../ui/forms/form-input';
import { User } from '../../store/api/types';
import { PageHeader } from '../../components';
import { ROUTES } from '../../const/routes';
import { useFetchMeQuery, useUpdateMeMutation } from '../../store/api/authApi';
import { QueryComponent } from '../../utils/hoc/withQuery';

const formSchema = object({
	firstName: string().min(1, 'Нужно заполнить поле'),
	lastName: string().min(1, 'Нужно заполнить поле'),
	phone: string(),
	email: string().email('Некорректный формат'),
});

type FormType = TypeOf<typeof formSchema>;

interface Props {
	userData: User;
	refetchUserData: () => void;
}

const EditProfileForm = (props: Props) => {
	const { userData, refetchUserData } = props;
	const [updateMeRequestFn, { isLoading }] = useUpdateMeMutation();

	const formMethods = useForm<FormType>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: {
			firstName: userData.name.split(' ')[0] || '',
			lastName: userData.name.split(' ')[1] || '',
			phone: '',
			email: userData.email,
		},
	});

	const { handleSubmit } = formMethods;

	const onSubmitHandler: SubmitHandler<FormType> = (values: FormType) => {
		updateMeRequestFn({
			name: `${values.firstName} ${values.lastName}`,
			about: 'Info',
		}).then(refetchUserData);
	};

	return (
		<FormProvider {...formMethods}>
			<Grid
				mt={2.5}
				container
				spacing={1.5}
				component='form'
				onSubmit={handleSubmit(onSubmitHandler)}
				noValidate
				autoComplete='off'>
				<Grid item xs={12} sm={6}>
					<FormInput label='Имя' name='firstName' required fullWidth />
				</Grid>
				<Grid item xs={12} sm={6}>
					<FormInput label='Фамилия' name='lastName' required fullWidth />
				</Grid>
				<Grid item xs={12} sm={6}>
					<FormInput label='Телефон' name='phone' fullWidth />
				</Grid>
				<Grid item xs={12} sm={6}>
					<FormInput label='Почта' name='email' fullWidth />
				</Grid>
				<Grid item xs={12} sm={12} mt={1.5}>
					<Button type='submit' variant='outlined' loading={isLoading}>
						Сохранить
					</Button>
				</Grid>
			</Grid>
		</FormProvider>
	);
};

const EditProfilePage = () => {
	const { data, error, isFetching, isError, refetch } = useFetchMeQuery();

	if (isError || isFetching || !data) {
		return (
			<QueryComponent
				isLoading={isFetching}
				isError={isError}
				refetch={refetch}
				error={error}
			/>
		);
	}

	return (
		<>
			<PageHeader to={ROUTES.profile} backLabel='Назад' title='Мои данные' />
			<EditProfileForm userData={data} refetchUserData={refetch} />
		</>
	);
};

export default EditProfilePage;
