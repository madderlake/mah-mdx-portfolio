import Link from 'next/link'
import { ThemeToggle } from './theme-toggle'

export default function Header() {
  return (
    <header className='fixed inset-x-0 top-0 z-50 bg-background/75 py-6 backdrop-blur-sm'>
      <nav className='container flex max-w-5xl items-center justify-between'>
        <div>
          <h1>
            <Link href='/' className='font-serif text-3xl font-bold'>
              MaH.
            </Link>
            <span className='block text-sm text-slate-400'>
              Designer Heart. Developer Mind.
            </span>
          </h1>
        </div>

        <ul className='flex items-center gap-6 text-sm font-light text-muted-foreground sm:gap-10'>
          <li className='transition-colors hover:text-foreground'>
            <Link href='/posts'>Posts</Link>
          </li>
          <li className='transition-colors hover:text-foreground'>
            <Link href='/projects'>Projects</Link>
          </li>
          {/* <li className='transition-colors hover:text-foreground'>
            <Link href='/about'>About</Link>
          </li> */}
          <li className='transition-colors hover:text-foreground'>
            <Link href='/contact'>Contact</Link>
          </li>
        </ul>

        <div>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
