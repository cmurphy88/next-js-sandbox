import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon } from '@heroicons/react/20/solid'

const { default: Link } = require('next/link')

const Navbar = () => {
  const links = [
    { href: '/', label: 'Home' },
    { href: '/health', label: 'Health' },
    { href: '/health/plan', label: 'Plan' },
    { href: '/todos', label: 'Todos' },
    { href: '/finances', label: 'Finances' },
  ]

  return (
    <>
      <div className="max-sm:hidden">
        <nav className="flex py-5 md:py-0">
          <h1>CM</h1>
          <ul className="flex items-center">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  className="rounded-2xl pr-5 md:p-5 md:mx-5 hover:bg-sky-900"
                  href={link.href}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="md:hidden">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-inherit px-3 py-2 text-sm font-semibold text-white/90 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-500">
              <Bars3Icon
                aria-hidden="true"
                className="-mr-1 size-5 text-white/90"
              />
              Menu
            </MenuButton>
          </div>

          <MenuItems
            transition
            className="absolute left-0 z-10 w-56 origin-top-left rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in hover:bg-gray-500"
          >
            <div className="pt-1 pb-6">
              {links.map((link) => (
                <li key={link.href}>
                  <MenuItem>
                    <a
                      href={link.href}
                      className="block px-4 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                    >
                      {link.label}
                    </a>
                  </MenuItem>
                </li>
              ))}
            </div>
          </MenuItems>
        </Menu>
      </div>
    </>
  )
}

export default Navbar
