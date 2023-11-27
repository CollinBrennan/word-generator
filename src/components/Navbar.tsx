import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const links = [
  { name: 'Generator', path: '/' },
  { name: 'Docs', path: '/docs' },
]

function Navbar() {
  const [currentPath, setCurrentPath] = useState('/')
  const navigate = useNavigate()

  function handleNavigate(path: string) {
    setCurrentPath(path)
    navigate(path)
  }

  return (
    <div className="bg-neutral-700 text-background p-2">
      <nav className="flex justify-between items-center">
        <div className="flex">
          {links.map((link) => (
            <a
              className={
                'px-4 py-2 rounded cursor-pointer' +
                (currentPath === link.path ? ' backdrop-brightness-50' : '')
              }
              onClick={() => handleNavigate(link.path)}
            >
              {link.name}
            </a>
          ))}
        </div>
        <a
          className="px-4"
          href="https://github.com/CollinBrennan"
          target="_blank"
        >
          Github
        </a>
      </nav>
    </div>
  )
}

export default Navbar
