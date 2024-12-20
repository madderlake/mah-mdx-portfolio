import Link from 'next/link'
import { getItemsOfType, ItemType } from '@/lib/content-type'
import Projects from '@/components/projects'

const type: ItemType = 'projects'
export default async function RecentProjects() {
  const projects = await getItemsOfType(type, 2)

  return (
    <section className='pb-24'>
      <div>
        <h2 className='title mb-12'>Selected projects</h2>
        <Projects projects={projects} />

        <Link
          href='/projects'
          className='mt-8 inline-flex items-center gap-2 text-muted-foreground underline decoration-1 underline-offset-2 transition-colors hover:text-foreground'
        >
          <span className='text-base'>All projects</span>
        </Link>
      </div>
    </section>
  )
}
