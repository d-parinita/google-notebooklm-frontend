'use client'
import React, { useState } from 'react'
import { FileText, Send } from 'lucide-react'
import { pdfjs, Document, Page } from 'react-pdf'
import { ask } from '@/app/apiServices'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString()

export default function NoteBookLM({ sessionId, fileUrl }) {
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages)
    setPageNumber(1)
  }

  const goToPrevPage = () => setPageNumber(prev => Math.max(prev - 1, 1))
  const goToNextPage = () => setPageNumber(prev => Math.min(prev + 1, numPages))

  const handleAsk = async () => {
    if (!question.trim()) return
    setLoading(true)
    setError(null)
    setAnswer("")

    try {
      const res = await ask({sessionId, question})
      if (res.data.answer) {
        setAnswer(res.data.answer)
        setQuestion('')
      } else {
        setError("No answer received")
        setQuestion('')
      }
    } catch (err) {
      setError("Error fetching answer")
      setQuestion('')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen bg-gray-100 flex">
      <div className="flex-1 flex flex-col bg-white border-r border-gray-200">
        <div className="flex-1 overflow-y-auto bg-gray-200 py-4 px-6 space-y-4">
          <div className="bg-purple-50 p-6 rounded-lg">
            <div className="font-bold text-purple-700 text-md flex items-center gap-2">
              <FileText color="#8758b6" /> Your document is ready!
            </div>
            <p className="text-sm my-4 pl-1 font-medium text-purple-700">
              You can now ask questions about your document. For example:
            </p>
            <ul className="list-disc pl-5 text-sm mt-1 font-medium text-purple-700 space-y-1">
              <li>&quot;What is the main topic of this document?&quot;</li>
              <li>&quot;Can you summarize the key points?&quot;</li>
              <li>&quot;What are the conclusions or recommendations?&quot;</li>
            </ul>
          </div>

          {loading && <p className="text-purple-600 font-medium">Thinking...</p>}
          {answer && (
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm text-green-700 whitespace-pre-line">{answer}</p>
            </div>
          )}
          {error && (
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 p-4 flex items-center gap-2">
          <input
            type="text"
            placeholder="Ask about the document..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="flex-1 px-3 py-3 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            onClick={handleAsk}
            disabled={loading}
            className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-3 rounded-lg disabled:opacity-50"
          >
            <Send />
          </button>
        </div>
      </div>

      <div className="flex-1 bg-gray-200 flex flex-col items-center justify-center overflow-auto">
        <div className="w-full max-w-4xl bg-white shadow-lg p-4 overflow-auto">
          <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} width={730} />
          </Document>

          {numPages && numPages > 1 && (
            <div className="flex justify-center items-center mt-4 gap-4">
              <button
                onClick={goToPrevPage}
                disabled={pageNumber === 1}
                className="px-3 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded disabled:opacity-50"
              >
                Prev
              </button>
              <span>
                Page {pageNumber} of {numPages}
              </span>
              <button
                onClick={goToNextPage}
                disabled={pageNumber === numPages}
                className="px-3 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
