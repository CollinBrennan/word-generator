import { useState } from 'react'
import Form, { Inputs } from '../components/Form'
import { generateWordList } from '../generate'
import IPAChart from '../components/IPAChart'

function Home() {
  const [formData, setFormData] = useState<Inputs>()
  const wordList = formData ? generateWordList(formData) : null

  return (
    <div className="flex flex-row">
      <div className="w-3/4 flex flex-row">
        <div className="bg-secondary/25">
          <h1 className="bg-secondary p-4">IPA Symbols</h1>
          <div className="h-[calc(100vh-7rem)] overflow-y-scroll p-4">
            <IPAChart />
          </div>
        </div>

        <div className="flex-grow">
          <h1 className="bg-neutral-100 p-4">Configuration</h1>
          <div className="p-4">
            <Form setFormData={setFormData} />
          </div>
        </div>
      </div>

      <div className="w-1/4 bg-primary/25">
        <h1 className="bg-primary text-text p-4">Words</h1>
        <div className="h-[calc(100vh-7rem)] overflow-y-scroll p-4">
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
