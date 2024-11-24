import React, { useState, useEffect } from 'react'
import Papa from 'papaparse'

interface CSVViewerProps {
  file: File
}

export default function CSVViewer({ file }: CSVViewerProps) {
  const [data, setData] = useState<string[][]>([])

  useEffect(() => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const csv = e.target?.result
      if (typeof csv === 'string') {
        Papa.parse(csv, {
          complete: (results) => {
            setData(results.data as string[][])
          }
        })
      }
    }
    reader.readAsText(file)
  }, [file])

  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full divide-y divide-gray-200">
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

