import colors from './colors'

import { addAliases } from './utils'

const breakpoints = [420, 640, 1200, 1600]
const mediaQueries = breakpoints.map(width => `@media screen and (min-width: ${width}px)`)
const aliases = ['sm', 'md', 'lg', 'xl']

addAliases(breakpoints, aliases)
addAliases(mediaQueries, aliases)

export default {
  colors,
  breakpoints,
  mediaQueries,
  font: {
    main: "'PT Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif",
    heading: "'PT Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif",
    monospaced: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace",
  },
  /** Отступы для margin и padding  */
  space: [0, 4, 8, 16, 32, 64, 128],
  /** Размеры шрифта в пикселях */
  // fontSizes: [10, 12, 14, 16, 20, 24, 32, 48],
  fontSizes: [12, 14, 16, 18, 22, 26, 34, 50],
  /** Толщина начертания шрифта */
  fontWeights: {
    regular: 400,
    bold: 600,
  },
  letterSpacings: {
    normal: 'normal',
    caps: '0.025em',
  },
  /** Радиус скругления */
  radii: [2, 4, 8],
  boxShadows: [
    `0 0 2px 0 rgba(0,0,0,.08),0 1px 4px 0 rgba(0,0,0,.16)`,
    `0 0 2px 0 rgba(0,0,0,.08),0 2px 8px 0 rgba(0,0,0,.16)`,
    `0 0 2px 0 rgba(0,0,0,.08),0 4px 16px 0 rgba(0,0,0,.16)`,
    `0 0 2px 0 rgba(0,0,0,.08),0 8px 32px 0 rgba(0,0,0,.16)`,
  ],
  borders: [],
  opacity: 0.5,
  duration: {
    fast: `150ms`,
    normal: `300ms`,
    slow: `450ms`,
    slowest: `600ms`,
  },
  timingFunctions: {
    easeInOut: 'cubic-bezier(0.5, 0, 0.25, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.25, 1)',
    easeIn: 'cubic-bezier(0.5, 0, 1, 1)',
  },
}
