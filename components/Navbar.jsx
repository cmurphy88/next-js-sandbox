const { default: Link } = require('next/link')

const Navbar = () => {
  const links = [
    { href: '/', label: 'Home' },
    { href: '/health', label: 'Health' },
    { href: 'todos', label: 'Todos' },
  ]

  return (
    <div>
      <nav className="py-5 md:py-0">
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
  )
}

export default Navbar
