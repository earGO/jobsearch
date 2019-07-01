export default function dataToEntities(primaryKey, values) {
  return values.reduce((acc, current) => {
    acc[current[primaryKey]] = current
    return acc
  }, {})
}
