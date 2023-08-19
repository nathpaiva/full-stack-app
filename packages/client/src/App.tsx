/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useEffect, useState } from 'react'
import './App.css'

export function App() {
  const [headerSize, setHeaderSize] = useState<number | null>(null)
  const [csvParsedDocument, setCsvParsedDocument] = useState<string[] | null>(
    null,
  )

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
        const data = result?.split('\n').map((item) => item.split(','))

        setCsvParsedDocument(data.flat())
      }
    })

    fileReaderInstance.addEventListener('progress', (event) => {
      if (event.loaded && event.total) {
        const percentage = (event.loaded / event.total) * 100

        console.log(
          '🚀 ~ file: App.tsx:37 ~ readFile.addEventListener ~ percentage:',
          percentage,
        )
      }
    })

    fileReaderInstance.readAsText(fileText)
  }

  const handleHeaderSizerOnChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const quantity = Number(event.target.value)

    setHeaderSize(quantity)
  }

  return (
    <>
      <h1>Hello "User", welcome</h1>

      <h3>Add your csv file:</h3>
      <fieldset>
        <input
          type="number"
          onChange={handleHeaderSizerOnChange}
          defaultValue={headerSize ? headerSize : undefined}
          placeholder="Please type how many titles your file has"
        />
      </fieldset>
      <fieldset>
        <input
          type="file"
          accept=".csv"
          onChange={handleOnChangeCsv}
          disabled={!headerSize}
        />
      </fieldset>

      {/* Create table for the user data */}
      <h4>Your data will have {headerSize} titles</h4>
      <div
        className="grid-table"
        style={{
          gridTemplate: `max-content / repeat(${headerSize}, 150px)`,
        }}
      >
        {headerSize &&
          csvParsedDocument?.map((item, index) => {
            const isTitle = index + 1 <= headerSize
            const text = isTitle ? item.replaceAll('_', ' ') : item
            return (
              <div
                className={`grid-content ${isTitle ? 'title' : 'item'}`}
                key={`${item}-${index}`}
              >
                {text}
              </div>
            )
          })}
      </div>
    </>
  )
}
