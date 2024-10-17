import Link from 'next/link'
import { ThemeToggle } from './theme-toggle'

export default function Header() {
  return (
    <header className='fixed inset-x-0 top-0 z-50 bg-background/75 py-6 backdrop-blur-sm'>
      <div className='container max-w-4xl text-right'>
        <ThemeToggle />
      </div>
      <nav className='container max-w-4xl items-center justify-between sm:flex'>
        <div className='border-b border-dotted border-red-400 text-center sm:text-left'>
          <h1 className='pb-2'>
            <Link href='/' className='font-serif text-3xl font-bold'>
              MaryaH.
            </Link>
            <span className='mt-2 block text-sm text-slate-400'>
              DESIGNER HEART<span className='text-lg text-red-500'> ♥️ </span>
              DEVELOPER MIND.
            </span>
          </h1>
        </div>
        <div className='flex-col justify-center py-5'>
          <ul className='flex items-center justify-center gap-12 text-sm font-light text-muted-foreground sm:py-0'>
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
        </div>
      </nav>
    </header>
  )
}
