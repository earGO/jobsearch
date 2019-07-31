import csscolors from 'css-color-names'

const black = '#3a3a3a'
const white = '#ffffff'

// greys
const lightGrey = '#f5f5f5'
const semiLightGrey = '#ecebeb'
const grey = '#b5b5b5'
const darkGrey = '#b5b5b5'

const red = '#ef5350'
const green = '#66bb6a'
const orange = '#ffc324'
// blues
const lightBlue = '#1e88e5'
const blue = '#0091ea'
const darkBlue = '#1976d2'

const palette = {
  ...csscolors,
  black,
  white,
  lightGrey,
  semiLightGrey,
  grey,
  lightBlue,
  blue,
  darkBlue,
  red,
  green,
  orange,
  darkGrey,
}

const components = {
  // Input element
  input: {
    hover: palette.black,
    disabled: palette.grey,
    error: palette.red,
    success: palette.green,
    focus: palette.lightBlue,
  },

  // Checkbox
  checkbox: {
    checked: palette.lightBlue,
    unchecked: palette.lightGrey,
    disabled: palette.grey,
  },

  //Tabs
  tabs: {
    active: palette.blue,
    hover: palette.lightBlue,
  },
  //Radio
  radio: {
    checked: palette.lightBlue,
    unchecked: palette.lightGrey,
    disabled: palette.grey,
  },
}

const system = {
  // Main color
  primary: palette.blue,

  // States
  hover: palette.lightBlue,
  success: palette.green,
  warning: palette.orange,
  error: palette.red,

  // Misc
  text: palette.black,
  border: palette.semiLightGrey,

  // Disabled
  disabled: palette.grey,
  highlight: palette.lightGrey,
  onclick: palette.darkBlue,
  // Scrollbar
  scrollbar: palette.darkGrey,

  //legacy
  info: palette.lightBlue,
  highlightHover: palette.lightBlue,
  black: palette.black,
  white: palette.white,
}

export default {
  system,
  palette,
  ...palette,
  ...system,
  ...components,
}
