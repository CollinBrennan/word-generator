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
      <nav className="flex justify-between items-center px-4 py-2">
        <h1 className="flex items-center text-neutral-300">
          <span className="text-2xl font-bold text-background pr-4">wrdz</span>{' '}
          by Collin Brennan
        </h1>
        <div className="hidden md:flex items-center">
          {pages.map((page, index) => (
            <a
              key={index}
              className={
                'px-4 py-2 rounded' +
                (currentPath === page.path
                  ? ' backdrop-brightness-50'
                  : ' cursor-pointer')
              }
              onClick={() => handleNavigate(page.path)}
            >
              {page.name}
            </a>
          ))}
          <div className="ml-2 px-2 border-l border-neutral-300 text-neutral-300">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                className={
                  'px-4 py-2 last:pr-0 cursor-pointer' +
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
