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
                <div className='h-72 bg-muted sm:h-72'>
                  <div className='h-full w-full overflow-clip rounded-md'>
                    <Image
                      src={thumbData?.src ? thumbData?.src : imageData?.src}
                      alt={title || ''}
                      fill
                      className='rounded-md object-cover object-top grayscale transition-transform duration-500 group-hover:scale-105 group-hover:grayscale-0'
                    />
                  </div>
                </div>
              )}

              <div className='absolute inset-[1px] rounded-md bg-background/80 opacity-0 transition-opacity duration-500 group-hover:opacity-100' />

              <div className='absolute inset-x-0 bottom-0 translate-y-2 px-6 py-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100'>
                <h2 className='title line-clamp-1 text-xl no-underline'>
                  {project.title}
                </h2>
                <p className='line-clamp-1 text-sm text-muted-foreground'>
                  {project.summary}
                </p>
                <p className='text-xs font-light text-muted-foreground'>
                  {formatDate(project.publishedAt ?? '')}
                </p>
              </div>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
