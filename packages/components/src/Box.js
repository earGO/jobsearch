import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Box = styled.div`
	display: inline-block;
	width: ${props => props.width + 'px'};
	height: ${props => props.height + 'px'};
	background-color: ${props => props.bg};
	border-radius: ${props => props.br + 'px'};
	border-color: ${props => props.borderColor};
	border-width: ${props => props.borderWidth + 'px'};
	border-style: ${props => props.borderStyle};
`;

Box.propTypes = {
	width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	bg: PropTypes.string,
	br: PropTypes.number,
	borderColor: PropTypes.string,
	borderWidth: PropTypes.number,
	borderStyle: PropTypes.string
};

Box.defaultProps = {
	width: '100%',
	height: '100%',
	bg: 'none',
	br: 0,
	borderColor: 'none',
	borderWidth: 0,
	borderStyle: 'none'
};

export default Box;
