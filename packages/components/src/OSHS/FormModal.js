import React from 'react'
import {Modal, Card, Heading, Relative, Absolute, Icon} from '../../import'

function FormModal({isOpen, title, close, children}) {
	return (
		<Modal isOpen={isOpen}>
			<Relative>
				<Card p={4} width={500} bg="white" borderRadius={1}>
					<Absolute right={15} top={15}>
						<Icon
							name="times"
							style={{cursor: 'pointer'}}
							onClick={close}
						/>
					</Absolute>
					<Heading p={1} tag="h4">
						{title}
					</Heading>
					{children}
				</Card>
			</Relative>
		</Modal>
	)
}

FormModal.propTypes = {}

export default FormModal
