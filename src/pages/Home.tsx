import { useState } from 'react'
import Form from '../components/Form'
import { generateWordList } from '../generate'
import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline'

function Home() {
  const [wordList, setWordList] = useState<string[]>([])
  const [showingDuplicates, setShowingDuplicates] = useState(true)
  const [showingAsList, setShowingAsList] = useState(false)

  const wordListNoDuplicates = [...new Set(wordList)]
  const outputText = (showingDuplicates ? wordList : wordListNoDuplicates).join(
    showingAsList ? '\n' : ' '
  )

  function handleWriteToClipboard() {
    navigator.clipboard.writeText(outputText)
  }

  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-3/4">
        <Form onSubmit={(data) => setWordList(generateWordList(data))} />
      </div>

      <div className="flex flex-col bg-primary/20 md:w-1/4">
        <h1 className="bg-primary p-4">Words</h1>
        <div className="md:h-[calc(100vh-7rem)] overflow-y-auto p-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-4">
              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  onChange={() => setShowingAsList((prev) => !prev)}
                  checked={showingAsList}
                />
                List
              </label>

              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  onChange={() => setShowingDuplicates((prev) => !prev)}
                  checked={showingDuplicates}
                />
                Show duplicates
              </label>
            </div>

            <div>
              <button onClick={handleWriteToClipboard} className="p-2 group">
                <ClipboardDocumentListIcon className="h-6 group-active:text-neutral-500" />
              </button>
            </div>
          </div>

          <div className="border-y border-primary py-4 my-4">
            <p>
              {`Words generated:
              ${
                showingDuplicates
                  ? wordList.length
                  : wordListNoDuplicates.length
              }`}
            </p>
            {!showingDuplicates && (
              <p>{`Duplicates removed: ${
                wordList.length - wordListNoDuplicates.length
              }`}</p>
            )}
          </div>

          <p className="whitespace-pre-line font-noto">
            {wordList.length > 0 ? (
              outputText
            ) : (
              <span className="italic font-semibold">
                Click 'Generate' to see word list.
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home
