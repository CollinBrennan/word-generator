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
    <div className="flex items-center justify-center bg-primary text-text">
      <div className="flex items-center justify-between w-full max-w-screen-xl p-4">
        <div className="flex flex-row gap-4">
          <nav className="flex flex-row items-center">
            {links.map((link) => (
              <a
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
        <div>
          <a href="https://github.com/CollinBrennan" target="_blank">
            Github
          </a>
        </div>
      </div>
    </div>
  )
}

export default Navbar
