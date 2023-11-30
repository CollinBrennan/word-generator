import { useState } from 'react'
import Form from '../components/Form'
import { generateWordList } from '../generate'

function Home() {
  const [wordList, setWordList] = useState<string[]>([])

  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-3/4">
        <Form onSubmit={(data) => setWordList(generateWordList(data))} />
      </div>

      <div className="flex flex-col bg-primary/25 md:w-1/4">
        <h1 className="bg-primary p-4">Words</h1>
        <div className="md:h-[calc(100vh-7rem)] overflow-y-auto p-4">
          <p className="whitespace-pre-line">
            {wordList ? (
              wordList.join('\n')
            ) : (
              <span className="italic">Click generate to see word list.</span>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home
