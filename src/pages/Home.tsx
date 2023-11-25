import Form from '../components/Form'

function Home() {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-screen-xl justify-center items-center flex px-2">
        <div className="flex flex-col md:flex-row w-full gap-2 pt-2">
          <div className="rounded-xl p-4 md:w-3/4">
            <Form />
          </div>
          <div className="bg-secondary h-36 rounded-xl p-4 flex-grow shadow">
            Hello!
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
