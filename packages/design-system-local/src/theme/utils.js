import Color from 'color'

export function darken(color, percent) {
  return Color(color)
    .darken(percent)
    .hex()
}

export function lighten(color, percent) {
  return Color(color)
    .lighten(percent)
    .hex()
}

export function mix(color1, color2, ratio) {
  return Color(color1)
    .mix(Color(color2), ratio)
    .hex()
}

export function makeShades(colorName, colorValue) {
  const shades = {
    // temp
    _dark: color => darken(color, 0.7),
    semiDark: color => darken(color, 0.35),
    semiLight: color => lighten(color, 0.35),
    _light: color => lighten(color, 0.7),
  }

  return Object.keys(shades).reduce(
    (acc, shade) => ({
      ...acc,
      [`${shade}${colorName}`]: shades[shade](colorValue),
    }),
    {},
  )
}

export const addAliases = (arr, aliases) =>
  aliases.forEach((key, i) =>
    Object.defineProperty(arr, key, {
      enumerable: false,
      get() {
        return this[i]
      },
    }),
  )
