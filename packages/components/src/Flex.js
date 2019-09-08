import React from 'react';
import styled from 'styled-components';
import Box from './Box';
import PropTypes from 'prop-types';

const Flex = styled(Box)`
	display: flex;
	flex-wrap: ${props => props.flexWrap};
	flex-direction: ${props => props.flexDirection};
	justify-content: ${props => props.justifyContent};
	align-items: ${props => props.alignItems};
`;

Flex.propTypes = {
	alignItems: PropTypes.oneOf([
		'flex-start',
		'flex-end',
		'center',
		'baseline',
		'stretch'
	]),
	justifyContent: PropTypes.oneOfType([
		PropTypes.oneOf([
			'flex-start',
			'flex-end',
			'center',
			'space-between',
			'space-around',
			'space-evenly'
		]),
		PropTypes.array
	]),
	flexWrap: PropTypes.oneOf(['nowrap', 'wrap', 'wrap-reverse']),
	/**
	 * Задаёт направление основных осей в контейнере и тем самым определяет положение флексов в контейнере
	 */
	flexDirection: PropTypes.oneOf([
		'row',
		'row-reverse',
		'column',
		'column-reverse'
	])
};

Flex.defaultProps = {
	justifyContent: 'flex-start',
	alignItems: 'stretch',
	flexDirection: 'row',
	flexWrap: 'nowrap'
};

export default Flex;
