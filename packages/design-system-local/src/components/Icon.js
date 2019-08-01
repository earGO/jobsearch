import React from 'react'
import MaterialIcon from 'material-icons-react'
import theme from '../theme'

const Icon = ({name, size, color, ...props}) => {
	const iconColor = theme.colors[color]
	return <MaterialIcon icon={name} size={size} color={iconColor} {...props} />
}

Icon.defaultProps = {
	name: 'error',
	size: 24
}
export default Icon
