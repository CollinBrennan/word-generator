import { useState } from 'react'
import Form, { Inputs } from '../components/Form'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

function Home() {
  const [output, setOutput] = useState<Inputs>()
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-screen-xl justify-center flex pt-8">
        <div className="flex flex-col md:flex-row w-full p-2 gap-4">
          <div className="rounded-xl md:w-2/3">
            <Form setOutput={setOutput} />
          </div>

          <div className="md:w-1/3 flex flex-col gap-4">
            <div className="bg-secondary/50 rounded-xl shadow flex justify-between p-4">
              IPA Chart <ChevronDownIcon className="h-6" />
            </div>
            <div className="bg-primary rounded-xl shadow p-4">
              <p className="font-bold">Words: </p>
              <p className="overflow-hidden">
                {output?.pattern ?? (
                  <span className="italic">
                    Click generate to see word listdasdasdasdasdsa
                    dsa.listdasdasdasdasdsadasdasdasdasdasdasddsa.listdasdasd
                    dasdsadasdasdasda.listdasdasdatdasdsa.listdasdasdasdasdsadasdasdasdasdasdasddsa.
                  </span>
                )}
              </p>
              <p>{output?.characterGroups[0].characters ?? ''}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
