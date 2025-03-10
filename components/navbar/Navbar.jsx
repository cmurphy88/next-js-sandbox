const { default: Link } = require('next/link')

const Navbar = () => {
  const links = [
    { href: '/', label: 'Home' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: 'todos', label: 'Todos' },
  ]

  return (
    <div>
      <nav>
        <ul className="flex items-center">
          {links.map((link) => (
            <li>
              <Link
                className="rounded-2xl p-5 mx-5 hover:bg-sky-900"
                href={link.href}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
