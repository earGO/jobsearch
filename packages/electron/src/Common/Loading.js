import React from 'react';
import {Icon} from 'antd';
import Flex from '@jobsearch/components/src/Flex';

function Loading() {
	return (
		<Flex
			flexDirection={'row'}
			flexWrap={'nowrap'}
			justifyContent={'center'}
			alignItems={'center'}
			height={'100%'}
			width={'100%'}
		>
			<Icon type="loading" />
		</Flex>
	);
}

export default Loading;
