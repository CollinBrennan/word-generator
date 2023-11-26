import { useState } from 'react'
import Form, { Inputs } from '../components/Form'
import { ChevronUpIcon } from '@heroicons/react/24/outline'
import { generateWordList } from '../generate'

function Home() {
  const [formData, setFormData] = useState<Inputs>()
  const wordList = formData ? generateWordList(formData) : null

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-screen-xl justify-center flex">
        <div className="flex flex-col md:flex-row w-full">
          <div className="h-[calc(100vh-72px)] w-1/4">
            <div className="h-full bg-primary/25 p-4 shadow overflow-y-scroll">
              <div>
                Words:
                {wordList ? (
                  wordList.map((word) => <p>{word}</p>)
                ) : (
                  <p className="italic">Click generate to see word list.</p>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-xl p-4 md:w-3/4">
            <Form setFormData={setFormData} />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 max-w-screen-xl">
        <button className="font-bold bg-secondary/25 w-96 py-2 rounded-t-xl">
          IPA Chart <ChevronUpIcon className="inline h-6" />
        </button>
      </div>
    </div>
  )
}

export default Home
