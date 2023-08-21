import { useEffect, useState } from 'react'

import './App.css'
import { useCsv } from './hooks'

export function App() {
  const [columns, setColumns] = useState<number | null>(null)
  const { csvParsedDocument, handleOnChangeCsv } = useCsv()

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

      <form
        onSubmit={(event) => {
          event.preventDefault()
          console.log('submit csv', csvParsedDocument)
        }}
      >
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

        <button type="submit" disabled={!csvParsedDocument?.length}>
          Send CSV
        </button>
      </form>

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
