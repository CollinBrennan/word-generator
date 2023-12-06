import { Bars3Icon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.svg'
import { Menu } from '@headlessui/react'

const pages = [
  { name: 'Generator', path: '/' },
  { name: 'Docs', path: '/docs' },
]

const links = [
  { name: 'Github', url: 'https://github.com/CollinBrennan/word-generator' },
]

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
      <div className="relative flex justify-between items-center px-4 py-2">
        <img src={logo} className="h-6" alt="Wrdz" />

        <Menu as="nav" className="relative text-right md:hidden">
          <Menu.Button className="py-2">
            <Bars3Icon className="h-6" />
          </Menu.Button>
          <Menu.Items className="absolute right-0 flex flex-col shadow bg-background text-text rounded overflow-hidden divide-y divide-neutral-200">
            <div className="flex flex-col">
              {pages.map((page, index) => (
                <Menu.Item>
                  {({ active }) => (
                    <a
                      key={index}
                      onClick={() => handleNavigate(page.path)}
                      className={`px-4 py-2 cursor-pointer ${
                        active && 'bg-neutral-300'
                      }`}
                    >
                      {page.name}
                    </a>
                  )}
                </Menu.Item>
              ))}
            </div>
            <div className="flex flex-col">
              {links.map((link, index) => (
                <Menu.Item>
                  {({ active }) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      className={`px-4 py-2 cursor-pointer ${
                        active && 'bg-neutral-300'
                      }`}
                    >
                      {link.name}
                    </a>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Menu>

        <nav className="hidden md:flex items-center">
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
        </nav>
      </div>
    </div>
  )
}

export default Navbar
