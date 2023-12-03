import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.svg'

const pages = [
  { name: 'Generator', path: '/' },
  { name: 'Docs', path: '/docs' },
]

const links = [
  { name: 'Github', url: 'https://github.com/CollinBrennan/word-generator' },
]

function Navbar() {
  const [currentPath, setCurrentPath] = useState('/')
  const [isNavShowing, setIsNavShowing] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    navigate(currentPath)
  }, [currentPath])

  function handleNavigate(path: string) {
    setCurrentPath(path)
    setIsNavShowing(false)
  }

  return (
    <div className="bg-neutral-700 text-background">
      <nav className="relative flex justify-between items-center px-4 py-2">
        <h1 className="flex items-center text-neutral-300 gap-4">
          <img src={logo} className="h-6" />
          by Collin Brennan
        </h1>

        <div>
          <div>
            <button
              onClick={() => setIsNavShowing((prev) => !prev)}
              className="flex items-center md:hidden p-2"
            >
              {isNavShowing ? (
                <XMarkIcon className="h-6" />
              ) : (
                <Bars3Icon className="h-6" />
              )}
            </button>
            {isNavShowing && (
              <div className="flex flex-col absolute right-0 bottom-0 translate-y-full m-2 bg-background text-text md:hidden rounded shadow">
                {pages.map((page, index) => (
                  <a
                    key={index}
                    onClick={() => handleNavigate(page.path)}
                    className="px-4 py-2"
                  >
                    {page.name}
                  </a>
                ))}
                <div className="flex flex-col border-t border-gray-300">
                  {links.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      className="px-4 py-2"
                    >
                      {link.name}
                    </a>
                  ))}{' '}
                </div>
              </div>
            )}
          </div>

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
                  className={'px-4 py-2 last:pr-0 cursor-pointer'}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
