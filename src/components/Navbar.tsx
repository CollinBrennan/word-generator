import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const pages = [
  { name: 'Generator', path: '/' },
  { name: 'Docs', path: '/docs' },
]

const links = [{ name: 'Github', url: 'https://github.com/CollinBrennan' }]

function Navbar() {
  const [currentPath, setCurrentPath] = useState('/')
  const navigate = useNavigate()

  useEffect(() => {
    navigate(currentPath)
  }, [currentPath])

  function handleNavigate(path: string) {
    setCurrentPath(path)
  }

  return (
    <div className="bg-neutral-700 text-background">
      <nav className="flex justify-between items-center px-4">
        <h1 className="text-neutral-300">
          <span className="text-3xl font-bold text-background pr-2">wrdz</span>{' '}
          by Collin Brennan
        </h1>
        <div className="flex items-center">
          {pages.map((page) => (
            <a
              className={
                'p-4 cursor-pointer' +
                (currentPath === page.path ? ' backdrop-brightness-50' : '')
              }
              onClick={() => handleNavigate(page.path)}
            >
              {page.name}
            </a>
          ))}
          <div className="ml-2 px-2 border-l border-neutral-300 text-neutral-300">
            {links.map((link) => (
              <a
                href={link.url}
                target="_blank"
                className={
                  'p-4 last:pr-0 cursor-pointer' +
                  (currentPath === link.url ? ' backdrop-brightness-50' : '')
                }
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
