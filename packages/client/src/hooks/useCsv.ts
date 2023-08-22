import { useState } from 'react'

import { formatFileData } from '../helpers'

interface IUseCsv {
  csvParsedDocument: string[] | null
  csvDocument: FormData | null
  handleOnChangeCsv: (file: React.ChangeEvent<HTMLInputElement>) => void
}

export const useCsv = (): IUseCsv => {
  const [csvDocument, setCsvDocument] = useState<{
    parsed: IUseCsv['csvParsedDocument']
    file: IUseCsv['csvDocument']
  }>({
    parsed: null,
    file: null,
  })

  const handleOnChangeCsv = (file: React.ChangeEvent<HTMLInputElement>) => {
    if (!file.target.files?.length) return

    const _file = file.target.files[0]
    const fileName = _file.name

    const fileReaderInstance = new FileReader()
    const formData = new FormData()
    formData.append('name', fileName)
    formData.append('file', _file)
    setCsvDocument((prev) => ({
      ...prev,
      file: formData,
    }))

    fileReaderInstance.addEventListener('load', (event) => {
      const result = event.target?.result

      if (typeof result === 'string') {
        const data = formatFileData(result).flat()

        setCsvDocument((prev) => ({
          ...prev,
          parsed: data,
        }))
      }
    })

    fileReaderInstance.readAsText(_file)
  }

  return {
    csvParsedDocument: csvDocument.parsed,
    csvDocument: csvDocument.file,
    handleOnChangeCsv,
  }
}
