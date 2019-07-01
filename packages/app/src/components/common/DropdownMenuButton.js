import React from 'react'
import styled from 'styled-components'
import { Card, Text, Button, Icon, Popover } from '@ursip/design-system'

const Item = styled(Text)`
  border-bottom: 1px solid ${props => props.theme.colors.border};
  padding: ${props => `${props.theme.space[2]}px ${props.theme.space[2]}px`};
  transition: background-color 0.5s;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.colors.lightGrey};
  }
  &:last-child {
    border: 0;
  }
`

function DropdownMenuButton({ children, items, ...props }) {
  const [visible, setDropdownVisibility] = React.useState(false)
  const handleButtonClick = () => setDropdownVisibility(!visible)
  const closeDropdown = () => setDropdownVisibility(false)
  const popoverContent = () => (
    <Card
      bg="white"
      style={{
        whiteSpace: 'nowrap',
      }}
    >
      {items.map((item, index) => (
        <Item
          key={index}
          onClick={() => {
            closeDropdown()
            item.onClick && typeof item.onClick === 'function' && item.onClick()
          }}
        >
          {item.name}
        </Item>
      ))}
    </Card>
  )

  return (
    <Popover
      disableReposition={false}
      isOpen={visible}
      position="bottom"
      content={popoverContent}
      onClickOutside={closeDropdown}
    >
      <Button type="primary" size="small" onClick={handleButtonClick} {...props}>
        {children} {<Icon mx={1} name={visible ? 'chevron-up' : 'chevron-down'} />}
      </Button>
    </Popover>
  )
}

DropdownMenuButton.defaultProps = {
  items: [],
}

export default DropdownMenuButton
