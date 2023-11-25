import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const links = [
  { name: 'Generator', path: '/' },
  { name: 'Docs', path: '/docs' },
]

function Navbar() {
  const [currentPage, setCurrentPage] = useState('/')
  const navigate = useNavigate()

  function handleNavigate(path: string) {
    setCurrentPage(path)
    navigate(path)
  }

  return (
    <div className="flex items-center justify-center bg-primary text-text shadow">
      <div className="flex items-center justify-between w-full p-2">
        <div className="p-2 flex flex-row gap-8 items-center">
          <h1 className="text-2xl">Word Generator</h1>
          <nav className="flex flex-row items-center">
            {links.map((link) => (
              <a
                key={link.name}
                className={
                  'cursor-pointer py-2 px-4 rounded' +
                  (currentPage === link.path
                    ? ' backdrop-brightness-50 text-background'
                    : '')
                }
                onClick={() => handleNavigate(link.path)}
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
        <a
          className="p-4"
          href="https://github.com/CollinBrennan"
          target="_blank"
        >
          Github
        </a>
      </div>
    </div>
  )
}

export default Navbar
