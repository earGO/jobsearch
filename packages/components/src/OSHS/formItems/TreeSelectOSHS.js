import React from 'react'
import 'antd/dist/antd.css'
import {TreeSelect} from 'antd'
import {useDefaultInForm} from '../../../import'
import FormItemWrapper from './FormItemWrapper'

function TreeSelectOSHS({
	label,
	errors,
	pb,
	width,
	defaultValue,
	value,
	...rest
}) {
	const valueWithDefault = useDefaultInForm(defaultValue, value)
	const wrapperProps = {label, errors, pb, width}

	return (
		<FormItemWrapper {...wrapperProps}>
			<TreeSelect
				value={valueWithDefault}
				size="large"
				style={{width: '100%'}}
				dropdownStyle={{
					maxWidth: 200,
					maxHeight: 400,
					// textOverflow: 'ellipsis',
					overflowX: 'hidden'
				}}
				{...rest}
			/>
		</FormItemWrapper>
	)
}

export default TreeSelectOSHS
