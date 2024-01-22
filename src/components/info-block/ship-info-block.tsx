import React from 'react';
import { Typography } from '@mui/material';
import { ItemInfoBlock } from './item-info-block';

const ShipInfoBlock = () => {
	return (
		<ItemInfoBlock icon='common/ic-truck' title='Доставка по всему Миру!'>
			<Typography variant='p2'>
				Доставка курьером — <b>от 399 ₽</b>
			</Typography>
			<Typography variant='p2'>
				Доставка в пункт выдачи — <b>от 199 ₽</b>
			</Typography>
		</ItemInfoBlock>
	);
};

export default ShipInfoBlock;
