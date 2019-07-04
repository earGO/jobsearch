import styled from 'styled-components'
import logo from '../../assets/mos.png'

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
  width: '35px',
  height: '35px',
  alt: 'logo',
  src: logo,
}

export default Logo
