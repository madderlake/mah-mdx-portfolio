import Link from 'next/link'
import Image from 'next/image'

import { formatDate } from '@/lib/utils'
import MDXContent from '@/components/mdx-content'
import { ArrowLeftIcon } from '@radix-ui/react-icons'
import { getProjectBySlug, getProjects, ProjectMetadata } from '@/lib/projects'
import { notFound } from 'next/navigation'
import Page from '@/components/ui/page'

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

  const { title, imageData, author, publishedAt } = metadata as ProjectMetadata

  return (
    <Page>
      <Link
        href='/projects'
        className='mb-8 inline-flex items-center gap-2 text-sm font-light text-muted-foreground transition-colors hover:text-foreground'
      >
        <ArrowLeftIcon className='h-5 w-5' />
        <span>Back to projects</span>
      </Link>

      {imageData?.src && (
        <div className='h-w-full relative mb-6 h-96 overflow-hidden rounded-lg'>
          <Image
            src={imageData?.src}
            alt={title || ''}
            className='!absolute !bottom-auto !right-auto !h-auto'
            fill
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

      <div className='project prose mt-10 text-lg dark:prose-invert'>
        <MDXContent source={content} />
      </div>
    </Page>
  )
}
