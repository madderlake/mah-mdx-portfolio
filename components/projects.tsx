import Image from 'next/image'
import Link from 'next/link'

import { ProjectMetadata } from '@/lib/projects'
import { formatDate } from '@/lib/utils'

export default function Projects({
  projects
}: {
  projects: ProjectMetadata[]
}) {
  return (
    <ul className='grid grid-cols-1 gap-8 sm:grid-cols-2'>
      {projects.map(project => {
        const { image, thumb, slug, title, imageData, thumbData } = project
        const imgData = thumbData !== null ? thumbData : imageData
        const aspectRatio = (imgData && imgData?.width / imgData?.height) || 1
        const isFillRatio: boolean = aspectRatio > 1.4
        return (
          <li key={slug} className='group relative'>
            <Link href={`/projects/${slug}`}>
              {project.image && (
                <div className='h-72 bg-muted sm:h-60'>
                  <div className='h-full w-full overflow-clip rounded-md'>
                    <Image
                      src={thumb ?? (image as string)}
                      alt={title || ''}
                      // width={!isFillRatio ? imgData?.width : undefined}
                      // height={!isFillRatio ? imgData?.height : undefined}
                      // fill={imgData === undefined || isFillRatio}
                      fill
                      className='grayscale-90 rounded-md object-cover object-top transition-transform duration-500 group-hover:scale-105 group-hover:grayscale-0'
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
