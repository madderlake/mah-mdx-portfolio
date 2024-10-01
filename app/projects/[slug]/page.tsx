import Link from 'next/link'
import Image from 'next/image'

import { formatDate } from '@/lib/utils'
import MDXContent from '@/components/mdx-content'
import { ArrowLeftIcon } from '@radix-ui/react-icons'
import { getProjectBySlug, getProjects } from '@/lib/projects'
import { notFound } from 'next/navigation'
import { supportedImages } from '@/lib/utils'

export async function generateStaticParams() {
  const projects = await getProjects()
  const slugs = projects.map(project => ({ slug: project.slug }))

  return slugs
}

export default async function Project({
  params
}: {
  params: { slug: string }
}) {
  const { slug } = params
  const project = await getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const { metadata, content } = project
  const { title, image, imageData, author, publishedAt } = metadata
  const isSupported =
    imageData?.type !== undefined && supportedImages.includes(imageData?.type)
  return (
    <section className='pb-24 pt-32'>
      <div className='container max-w-3xl'>
        <Link
          href='/projects'
          className='mb-8 inline-flex items-center gap-2 text-sm font-light text-muted-foreground transition-colors hover:text-foreground'
        >
          <ArrowLeftIcon className='h-5 w-5' />
          <span>Back to projects</span>
        </Link>

        {image && (
          <div className='h-w-full relative mb-6 h-96 overflow-hidden rounded-lg'>
            {!isSupported && (
              <img
                src={image}
                alt={title || ''}
                className='object-contain'
                width={imageData?.width}
                height={imageData?.height}
              />
            )}
            <Image
              src={image}
              alt={title || ''}
              className='object-contain'
              width={imageData?.width}
              height={imageData?.height}
              fill={imageData === undefined}
              unoptimized={!isSupported}
              priority
            />
          </div>
        )}

        <header>
          <h1 className='title'>{title}</h1>
          <p className='mt-3 text-xs text-muted-foreground'>
            {author} / {formatDate(publishedAt ?? '')}
          </p>
        </header>

        <main className='prose mt-16 text-lg dark:prose-invert'>
          <MDXContent source={content} />
        </main>
      </div>
    </section>
  )
}
