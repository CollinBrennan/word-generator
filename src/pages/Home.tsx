import { useState } from 'react'
import Form, { Inputs } from '../components/Form'
import { generateWordList } from '../generate'
import IPAChart from '../components/IPAChart'
import { ListBulletIcon, XMarkIcon } from '@heroicons/react/24/outline'

function Home() {
  const [isChartShowing, setIsChartShowing] = useState(false)
  const [formData, setFormData] = useState<Inputs>()
  const wordList = formData ? generateWordList(formData) : null

  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex-col shrink-0 bg-secondary/25 hidden md:flex">
        {isChartShowing ? (
          <>
            <div className="bg-secondary p-4 flex justify-between">
              <h1>IPA Chart</h1>
              <button onClick={() => setIsChartShowing(false)}>
                <XMarkIcon className="w-6" />
              </button>
            </div>
            <div className="h-[calc(100vh-7rem)] overflow-auto p-4">
              <IPAChart />
            </div>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsChartShowing(true)}
              className="bg-secondary p-4"
            >
              <ListBulletIcon className="h-6" />
            </button>
          </>
        )}
      </div>

      <div className="flex flex-col bg-background flex-grow">
        <div className="bg-neutral-100 p-4">Configuration</div>
        <div className="md:h-[calc(100vh-7rem)] overflow-y-auto p-4">
          <Form setFormData={setFormData} />
        </div>
      </div>

      <div className="flex flex-col bg-primary/25 md:w-1/3">
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
