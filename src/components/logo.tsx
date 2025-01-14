import Link from 'next/link'

const Logo = () => {
  return (
    <Link
      href="/"
      className="block bg-gradient-to-l from-violet-500 to-primary bg-clip-text text-center font-sans text-3xl font-bold text-transparent dark:from-violet-500 dark:to-primary"
    >
      findcode
    </Link>
  )
}

export default Logo
