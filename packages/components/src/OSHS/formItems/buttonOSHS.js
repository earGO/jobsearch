import React from 'react'
import {Flex, Button, Text} from '../../../import'

function FormButton({
	btn1Label,
	btn2Label,
	btn1OnClick,
	btn2OnClick,
	btn1Hide,
	btn2Hide
}) {
	return (
		<Flex mt={4} justifyContent="flex-end">
			{btn1Hide ? null : (
				<Button mr={2} onClick={btn1OnClick}>
					<Text color="white" px={3}>
						{btn1Label}
					</Text>
				</Button>
			)}
			{btn2Hide ? null : (
				<Button type="secondary" onClick={btn2OnClick}>
					<Text px={3}>{btn2Label}</Text>
				</Button>
			)}
		</Flex>
	)
}
export default FormButton
