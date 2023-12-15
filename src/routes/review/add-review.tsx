import React, { useEffect, useState } from 'react';
import { PageHeader } from '../../components';
import { Stack, Typography } from '@mui/material';
import FormInput from '../../ui/forms/form-input';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod';
import { Button, Spinner } from '../../ui';
import { object, string, TypeOf } from 'zod';
import { useActions, useAppSelector } from '../../store/hooks/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import FormRating from '../../ui/forms/form-rating';
import { getProduct } from '../../store/selectors/selectors';
import { getURLForCard } from '../../const/routes';

const formSchema = object({
	name: string().min(1, 'Нужно заполнить поле'),
	city: string().min(1, 'Нужно заполнить поле'),
	text: string().min(1, 'Нужно заполнить поле'),
	rating: string().min(1, 'Нужно заполнить поле'),
});

type FormType = TypeOf<typeof formSchema>;

const AddReview = () => {
	const { productId } = useParams();
	const { addReview } = useActions();
	const { loading, error } = useAppSelector(getProduct);

	const [waitResult, setWaitResult] = useState(false);
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
		setWaitResult(true);
		const request = {
			productId: productId || '',
			dto: {
				...values,
				rating: Number(values.rating),
			},
		};
		addReview(request);
	};

	useEffect(() => {
		if (waitResult && !loading) {
			navigate(getURLForCard(productId || ''));
		}
	}, [error, loading, navigate, productId, waitResult]);

	const { handleSubmit } = formMethods;

	if (loading) {
		return <Spinner />;
	}

	if (error) {
		return <>Error</>;
	}

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
					<Button type='submit' variant='outlined'>
						Отправить отзыв
					</Button>
				</Stack>
			</FormProvider>
		</div>
	);
};

export default AddReview;
