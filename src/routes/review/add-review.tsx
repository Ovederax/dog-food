import React from 'react';
import { PageHeader } from '../../components';
import { Stack, Typography } from '@mui/material';
import FormInput from '../../ui/forms/form-input';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod';
import { Button } from '../../ui';
import { object, string, TypeOf } from 'zod';
import { useNavigate, useParams } from 'react-router-dom';
import FormRating from '../../ui/forms/form-rating';
import { getURLForCard } from '../../const/routes';
import { useAddReviewMutation } from '../../store/api/productsApi';

const formSchema = object({
	name: string().min(1, 'Нужно заполнить поле'),
	city: string().min(1, 'Нужно заполнить поле'),
	text: string().min(1, 'Нужно заполнить поле'),
	rating: string().min(1, 'Нужно заполнить поле'),
});

type FormType = TypeOf<typeof formSchema>;

const AddReview = () => {
	const { productId = '' } = useParams();
	const [addReviewRequestFn, { isLoading }] = useAddReviewMutation();

	const navigate = useNavigate();

	const formMethods = useForm<FormType>({
		mode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			city: '',
			text: '',
			rating: '3',
		},
	});

	const onSubmitHandler: SubmitHandler<FormType> = (values: FormType) => {
		const request = {
			productId: productId || '',
			body: {
				...values,
				rating: Number(values.rating),
			},
		};
		addReviewRequestFn(request).then(() => {
			navigate(getURLForCard(productId || ''));
		});
	};

	const { handleSubmit } = formMethods;

	return (
		<div>
			<PageHeader
				to='/'
				backLabel='Назад'
				title='Отзыв о товаре Бублик из бычьего корня'
			/>
			<FormProvider {...formMethods}>
				<Stack
					mt={7.5}
					spacing={5}
					component='form'
					onSubmit={handleSubmit(onSubmitHandler)}
					noValidate
					autoComplete='off'>
					<Stack direction='row' spacing={5}>
						<Typography sx={{ width: 160 }}>Имя</Typography>
						<FormInput name='name' fullWidth />
					</Stack>
					<Stack direction='row' spacing={5}>
						<Typography sx={{ width: 160 }}>Город</Typography>
						<FormInput name='city' fullWidth />
					</Stack>
					<Stack direction='row' spacing={5}>
						<Typography sx={{ width: 160 }}>Текст</Typography>
						<FormInput name='text' fullWidth />
					</Stack>
					<Stack direction='row' spacing={5}>
						<Typography sx={{ width: 160 }}>Рейтинг</Typography>
						<FormRating name='rating' />
					</Stack>
					<Button type='submit' variant='outlined' loading={isLoading}>
						Отправить отзыв
					</Button>
				</Stack>
			</FormProvider>
		</div>
	);
};

export default AddReview;
