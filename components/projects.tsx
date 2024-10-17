import Image from 'next/image'
import Link from 'next/link'

import type { ProjectMetadata } from '@/lib/projects'
import { formatDate } from '@/lib/utils'

export default function Projects({
  projects
}: {
  projects: ProjectMetadata[]
}) {
  return (
    <ul className='grid grid-cols-1 gap-8 sm:grid-cols-2'>
      {projects.map((project: ProjectMetadata) => {
        const { slug, title, imageData, thumbData } = project

        return (
          <li key={slug} className='group relative'>
            <Link href={`/projects/${slug}`}>
              {imageData?.src && (
                <div className='h-72 bg-muted'>
                  <div className='h-full w-full overflow-clip rounded-md'>
                    <Image
                      src={
                        thumbData?.src !== undefined
                          ? thumbData?.src
                          : imageData?.src
                      }
                      alt={title || ''}
                      fill
                      className='bottom-0 rounded-md object-cover object-top grayscale transition-transform duration-500 group-hover:scale-105 group-hover:grayscale-0'
                    />
                  </div>
                </div>
              )}

              <div className='absolute inset-[4px] top-1/2 flex items-center rounded-md bg-background/90 transition-opacity duration-500 sm:inset-[1px] sm:opacity-0 sm:group-hover:opacity-100' />

              <div className='absolute inset-x-0 bottom-0 translate-y-2 px-6 py-8 transition-all duration-500 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100'>
                <div>
                  <h2 className='title line-clamp-1 text-xl no-underline'>
                    {project.title}
                  </h2>
                  <p className='line-clamp-1 text-lg text-muted-foreground'>
                    {project.summary}
                  </p>
                  <p className='text-sm font-light text-muted-foreground'>
                    {formatDate(project.publishedAt ?? '')}
                  </p>
                </div>
              </div>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
