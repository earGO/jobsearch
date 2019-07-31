import React from 'react'
import {storiesOf} from '@storybook/react'

import Icon from './Icon'

storiesOf('Icon', module)
	.addParameters({
		info: {
			inline: true,
			header: false,
			styles: {
				header: {
					h1: {
						color: 'red'
					}
				}
			}
		}
	})
	.add('Default', () => <Icon />, {
		info: {
			text: `
          По умолчанию без параметров иконка выводится в виде знака вопроса. 
        `
		}
	})
	.add('Plus', () => <Icon name={'add_circle_outline'} />, {
		info: {
			text: `
          Тип иконки передаётся в параметре {name}. 
        `
		}
	})
	.add('Sized', () => <Icon name={'add_circle_outline'} size={3} />, {
		info: {
			text: `
          Размер передается в параметр {size} от 0 до 4. 
          0 соответствует размеру шрифта 14, 1 - 18 (применяется по умолчанию, если параметр не передан, 2 - 24, 3 - 36, 4 - 48. 
        `
		}
	})
	.add(
		'Colored',
		() => <Icon name={'add_circle_outline'} size={3} color={'primary'} />,
		{
			info: {
				text: `
          Цвет передаётся в параметр {color}, и должен быть выбран из таблицы системных цветов в design-system.           
        `
			}
		}
	)
	.add(
		'Wrong',
		() => <Icon name={'remove_circle'} size={10} color={'ultraviolet'} />,
		{
			info: {
				text: `
          При неверных параметрах иконка рендерится с параметрами "по умолчанию". Неверно переданное название означает пустую иконку.           
        `
			}
		}
	)
