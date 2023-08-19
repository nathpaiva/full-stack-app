import { useEffect, useState } from 'react'
import './App.css'

export function App() {
  const [columns, setColumns] = useState<number | null>(null)
  const [csvParsedDocument, setCsvParsedDocument] = useState<string[] | null>(
    null,
  )
  const tableTitle = csvParsedDocument?.length
    ? `Your table has ${columns} columns`
    : ` ${
        columns
          ? `Your data will have: ${columns} columns`
          : 'Please add how many columns your files has'
      }`

  useEffect(() => {
    if (!csvParsedDocument) return

    console.log('csvDocument =>', csvParsedDocument)
  }, [csvParsedDocument])

  const handleOnChangeCsv = (file: React.ChangeEvent<HTMLInputElement>) => {
    if (!file.target.files?.length) return

    const fileText = file.target.files[0]
    const fileReaderInstance = new FileReader()

    fileReaderInstance.addEventListener('load', (event) => {
      const result = event.target?.result

      if (typeof result === 'string') {
        const data1 = result?.split('\n').map((row, index) => {
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
            if (
              rowIsArray &&
              !ends &&
              !starts &&
              typeof position === 'number'
            ) {
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

        const data = data1.flat()

        setCsvParsedDocument(data)
      }
    })

    fileReaderInstance.readAsText(fileText)
  }

  const handleHeaderSizerOnChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const quantity = Number(event.target.value)

    setColumns(quantity)
  }

  return (
    <>
      <h1>Hello "User", welcome</h1>

      <h3>Add your csv file:</h3>

      <fieldset className="fieldset-group">
        <input
          type="number"
          onChange={handleHeaderSizerOnChange}
          defaultValue={columns ? columns : undefined}
          placeholder="Set how many columns your table has"
        />

        <input
          type="file"
          accept=".csv"
          onChange={handleOnChangeCsv}
          disabled={!columns}
        />
      </fieldset>

      {/* Create table for the user data */}
      <h4>{tableTitle}</h4>
      <ul
        className="grid-table"
        style={{
          gridTemplate: `max-content / repeat(${columns}, 1fr)`,
        }}
        role="table"
        aria-label={tableTitle}
      >
        {columns &&
          csvParsedDocument?.map((item, index) => {
            const isTitle = index + 1 <= columns
            const text = isTitle ? item.replaceAll('_', ' ') : item
            return (
              <li
                className={`grid-content ${isTitle ? 'title' : 'item'}`}
                key={`${item}-${index}`}
                role="row"
              >
                {text}
              </li>
            )
          })}
      </ul>
    </>
  )
}
