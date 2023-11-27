import { useState } from 'react'
import Form, { Inputs } from '../components/Form'
import { generateWordList } from '../generate'
import IPAChart from '../components/IPAChart'

function Home() {
  const [formData, setFormData] = useState<Inputs>()
  const wordList = formData ? generateWordList(formData) : null

  return (
    <div className="flex">
      <div className="flex flex-col bg-secondary/50">
        <h1 className="bg-secondary p-4">IPA Chart</h1>
        <div className="h-[calc(100vh-7rem)] overflow-y-scroll p-4">
          <IPAChart />
        </div>
      </div>

      <div className="flex flex-col bg-background flex-grow">
        <h1 className="bg-neutral-100 p-4">Configuration</h1>
        <div className="h-[calc(100vh-7rem)] overflow-y-scroll p-4">
          <Form setFormData={setFormData} />
        </div>
      </div>

      <div className="flex flex-col bg-primary/50 w-1/5">
        <h1 className="bg-primary p-4">Words</h1>
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
