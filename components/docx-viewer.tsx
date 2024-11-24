import React, { useState, useEffect } from 'react'
import mammoth from 'mammoth'

interface DocxViewerProps {
  file: File
}

export default function DocxViewer({ file }: DocxViewerProps) {
  const [content, setContent] = useState('')

  useEffect(() => {
    const reader = new FileReader()
    reader.onload = async (e) => {
      const arrayBuffer = e.target?.result as ArrayBuffer
      const result = await mammoth.convertToHtml({ arrayBuffer })
      setContent(result.value)
    }
    reader.readAsArrayBuffer(file)
  }, [file])

  return (
    <div className="prose max-w-full overflow-x-auto" dangerouslySetInnerHTML={{ __html: content }} />
  )
}

