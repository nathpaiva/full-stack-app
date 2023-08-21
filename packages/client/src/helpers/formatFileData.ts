export const formatFileData = (result: string): string[][] => {
  const formatData = result.split('\n').map((row, index) => {
    // the first row is the headers
    if (!index) {
      return row.split(',')
    }

    // set if the row is an array
    let rowIsArray = false
    // set the position of this row during the normalization
    let position: number | null = null
    // create the new row normalized
    const rowNormalized: string[] = []

    // we can void this by creating an regex to use in the `.split()` 🥲
    row.split(',').forEach((_item) => {
      // check if starts a new array
      const starts = _item.startsWith('"')
      // check if the end of the array
      const ends = _item.endsWith('"')

      // if is not an array only add the value to the new rowNormalized
      if (!starts && !ends && !rowIsArray) {
        rowNormalized.push(_item)
      }

      /**
       * if is starting a new array
       * set rowIsArray to true
       * injects the new value to the rowNormalized
       * set the position of this new item in the rowNormalized
       */
      if (starts) {
        rowIsArray = true
        rowNormalized.push(_item)
        position = rowNormalized.length - 1
      }

      /**
       * if the rowIsArray and is not the start ot end
       * concat the content in the rowNormalized in the correct position
       */
      if (rowIsArray && !ends && !starts && typeof position === 'number') {
        rowNormalized[position] = `${rowNormalized[position]},${_item}`
      }

      /**
       * if is the ends of the array
       * concat the content in the rowNormalized in the correct position
       * and reset the rowIsArray
       * and reset the position to null
       */
      if (ends && typeof position === 'number') {
        rowIsArray = false
        rowNormalized[position] = `${rowNormalized[position]},${_item}`

        position = null
      }
    })

    return rowNormalized
  })

  return formatData
}
