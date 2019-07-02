import styled from 'styled-components'
import logo from '../../assets/mge-logo.png'

const Logo = styled.img`
  display: inline-block;
  width: ${props => props.width};
  height: ${props => props.height};
  transition: opacity 0.2;
  :hover {
    opacity: 0.6;
  }
`

Logo.defaultProps = {
  width: '40px',
  height: '40px',
  alt: 'logo',
  src: logo,
}

export default Logo
