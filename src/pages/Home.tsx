import { useState } from 'react'
import Form, { Inputs } from '../components/Form'
import { ChevronUpIcon } from '@heroicons/react/24/outline'
import { generateWordList } from '../generate'

function Home() {
  const [formData, setFormData] = useState<Inputs>()
  const wordList = formData ? generateWordList(formData) : null

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-screen-xl justify-center flex pt-8">
        <div className="flex flex-col md:flex-row w-full p-2 gap-4">
          <div className="rounded-xl md:w-2/3">
            <Form setFormData={setFormData} />
          </div>

          <div className="md:w-1/3">
            <div className="bg-primary/25 rounded-xl shadow p-4">
              <p className="font-bold">Words: </p>
              <div className="max-h-[50vh] overflow-y-scroll">
                {wordList ? (
                  wordList.map((word) => <p>{word}</p>)
                ) : (
                  <p className="italic">Click generate to see word list.</p>
                )}
              </div>
            </div>
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
